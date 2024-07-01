const {
    addEvent,
    getEvent,
    updateById,
    deleteEventById,
    getDataById,
    getDataByLimit,
    filterDataByDate,
    filterDataByEventType

} = require("../business/business")
exports.addEvent = async (req, res) => await addEvent(req, res)//
exports.getEvent = async (req, res) => await getEvent(req, res)//
exports.updateById = async (req, res) => await updateById(req, res)
exports.deleteEventById = async (req, res) => await deleteEventById(req, res)
exports.getDataById = async (req, res) => await getDataById(req, res)
exports.getDataByLimit = async (req, res) => await getDataByLimit(req, res)
exports.filterDataByDate = async (req, res) => await filterDataByDate(req, res)
exports.filterDataByEventType = async (req, res) => await filterDataByEventType(req, res)
