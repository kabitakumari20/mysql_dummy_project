// just for testing 
//     
const express = require('express')
const app = express();
const server = require("http").Server(app)
const db = require("./src/app/db/db")
const routes = require("./routes");
const port = process.env.PORT || 8090;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    return res.status(200).send("Welcome to user  Management")
});

routes.map(route => {
    app.use(route.path, route.handler);
});

server.listen(port, () => {
    console.log(`Server started at  ${port}`);
});



