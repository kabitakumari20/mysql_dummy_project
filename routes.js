const user_routes = require("./src/app/modules/User/routes/routes")
const eventRoutes = require("./src/app/modules/event/router/router")
const ptmRoutes = require("./src/app/modules/ptm/ptm.router/ptm.routes")
module.exports = [
    {
        path: "/api/user",
        handler: user_routes
    }
    , {
        path: "/api/event",
        handler: eventRoutes
    },
    {
        path: "/api/ptm",
        handler: ptmRoutes
    }
]