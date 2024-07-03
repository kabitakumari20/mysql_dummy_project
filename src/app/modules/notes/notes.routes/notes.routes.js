let express = require("express");
let router = express.Router(), {
    createNotes,
    getNotes,
    updateNotesById,
    deleteNotesById,
    getNotesById,
    InnerjoinTable
} = require("../notes.controller/notes.controller")
router.post("/createNotes", createNotes)
router.get("/getNotes", getNotes)
router.put("/updateNotesById/:id", updateNotesById)
router.delete("/deleteNotesById/:id", deleteNotesById)
router.get("/getNotesById/:id", getNotesById)
router.get("/InnerjoinTable", InnerjoinTable)
module.exports = router