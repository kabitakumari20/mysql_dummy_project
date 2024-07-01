
let express = require('express');
let router = express.Router()
const {
    registration,
    login,
    allUsers,
    getLimitedUsers,
    getMinValue,
    getMaxValue,
    fileUplaod,
    getLike,
    getProfile,
    getUserById,
    getDistinctUser,
    getFilteredUsers,
    getFilteredUsersWithOrOprater,
    getOrderBy, getOrderByDes, insertInto, iSNULLSyntax } = require("../controller/controller")
const { wrapAsync } = require("../../../helpers/router.helper")
const { authenticate } = require("../../../middlewares/jwt.middleware")
router.post("/registration", registration)
router.post("/login", login)
router.get("/allUsers", allUsers)//
router.get("/getLimitedUsers", getLimitedUsers)//
router.get("/getMinValue", getMinValue)
router.get("/getMaxValue", getMaxValue)
router.get("/getLike", getLike)
router.get("/getProfile", authenticate, getProfile)
router.get("/getUserById", authenticate, getUserById)
router.get("/getDistinctUser", getDistinctUser)
router.post("/getFilteredUsers", getFilteredUsers)
router.post("/getFilteredUsersWithOrOprater", getFilteredUsersWithOrOprater)
router.get("/getOrderBy", getOrderBy)
router.get("/getOrderByDes", getOrderByDes)
router.post("/insertInto", insertInto)
router.get("/iSNULLSyntax", iSNULLSyntax)
router.post("/fileUplaod", fileUplaod)


module.exports = router