const {
    addPtm,
    getPtmList,
    updatePtmById,
    deletePtmById,
    getPtmById } = require("../ptm.business/ptm.business")
exports.addPtm = async (req, res) => await addPtm(req, res)
exports.getPtmList = async (req, res) => await getPtmList(req, res)
exports.updatePtmById = async (req, res) => await updatePtmById(req, res)
exports.deletePtmById = async (req, res) => await deletePtmById(req, res)
exports.getPtmById = async (req, res) => await getPtmById(req, res)