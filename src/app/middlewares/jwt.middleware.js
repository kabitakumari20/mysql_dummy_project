const jwt = require("jsonwebtoken")
const db = require("../db/db")
let secret = "manvisecreatkey"

const authenticate = async (req, res, next) => {
    try {
        // const token = req.header.token
        const auth = req.header("Authorization")
        const token = auth.substr(auth.indexOf(" ") + 1);
        console.log("token========>>", token)
        if (!token) return res.status(400).send({ msg: "unauthorized" })
        // console.log("secret=========>>", secret)
        const tokenDetail = jwt.verify(token, secret)
        console.log("tokenDetail========>>", tokenDetail)
        const [users] = await db.query("select * from user where id = ?", [tokenDetail.id])
        console.log("users==========>>", users)
        if (users.length == 0) return res.status(400).send({ msg: "unauthorized" })

        req.users = users[0]
        next()
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { authenticate }




