const {
    createNotes,
    getNotes,
    updateNotesById,
    deleteNotesById,
    getNotesById,
    InnerjoinTable } = require("../notes.business/notes.business")
exports.createNotes = async (req, res) => await createNotes(req, res)
exports.getNotes = async (req, res) => await getNotes(req, res)
exports.updateNotesById = async (req, res) => await updateNotesById(req, res)
exports.deleteNotesById = async (req, res) => await deleteNotesById(req, res)
exports.getNotesById = async (req, res) => await getNotesById(req, res)
exports.InnerjoinTable = async (req, res) => await InnerjoinTable(req, res)