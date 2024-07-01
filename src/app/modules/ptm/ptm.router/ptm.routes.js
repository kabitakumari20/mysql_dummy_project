let express = require('express');

let router = express.Router(),
    {
        addPtm,
        getPtmList,
        updatePtmById,
        deletePtmById,
        getPtmById } = require("../ptm.controller/ptm.controller")

router.post("/addPtm", addPtm)
router.get("/getPtmList", getPtmList)
router.put("/updatePtmById/:id", updatePtmById)
router.delete("/deletePtmById/:id", deletePtmById)
router.get("/getPtmById/:id", getPtmById)


module.exports = router

