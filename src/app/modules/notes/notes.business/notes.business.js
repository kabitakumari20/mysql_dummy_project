const db = require("../../../db/db")

const createNotes = async (req, res) => {
    try {
        const { topicName, title, description, date, chapterNumber, chapterName } = req.body;

        const [result] = await db.query(
            "INSERT INTO nots (topicName, title, description, date, chapterNumber, chapterName) VALUES (?, ?, ?, ?, ?, ?)",
            [topicName, title, description, date, chapterNumber, chapterName]
        );

        res.status(201).json({ msg: "Notes created successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const [findRow] = await db.query("SELECT * FROM nots");
        if (findRow.length === 0) {
            return res.status(404).json({ msg: "Data not found" });
        }
        return res.status(200).json({ msg: "Data found successfully", count: findRow.length, result: findRow });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const getNotesById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "ID is required" });
        }

        const [rows] = await db.query("SELECT * FROM nots WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ msg: "Data not found" });
        }

        return res.status(200).json({ msg: "Data found successfully", result: rows[0] });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const updateNotesById = async (req, res) => {
    try {
        const { id } = req.params;
        const { topicName, title, description, date, chapterNumber, chapterName } = req.body;

        if (!id) {
            return res.status(400).json({ msg: "ID is required" });
        }

        const [result] = await db.query(
            `UPDATE nots 
             SET topicName = ?, title = ?, description = ?, date = ?, chapterNumber = ?, chapterName = ? 
             WHERE id = ?`,
            [topicName, title, description, date, chapterNumber, chapterName, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Note not found" });
        }

        return res.status(200).json({ msg: "Note updated successfully", result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteNotesById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "ID is required" });
        }

        const [result] = await db.query("DELETE FROM nots WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Note not found" });
        }

        return res.status(200).json({ msg: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = { createNotes, getNotes, updateNotesById, deleteNotesById, getNotesById }