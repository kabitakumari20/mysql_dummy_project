
let express = require('express');
let router = express.Router()
const {
    addEvent,
    getEvent,
    updateById,
    deleteEventById,
    getDataById,
    getDataByLimit,
    filterDataByDate,
    filterDataByEventType } = require("../controller/controller")
const { wrapAsync } = require("../../../helpers/router.helper")
router.post("/addEvent", addEvent)//
router.get("/getEvent", getEvent)//
router.put("/updateById/:id", updateById)
router.delete("/deleteEventById/:id", deleteEventById)
router.get("/getDataById/:id", getDataById)
router.get("/getDataByLimit", getDataByLimit)
router.get("/filterDataByDate", filterDataByDate)
router.get("/filterDataByEventType", filterDataByEventType)


module.exports = router