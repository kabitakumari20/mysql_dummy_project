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


const InnerjoinTable = async (req, res) => {
    try {
        // Execute the SQL query to join tables
        const [rows] = await db.query(`
            // SELECT * FROM event INNER JOIN ptm ON event.ptmId = ptm.id;
            SELECT * FROM event LEFT JOIN ptm ON event.ptmId = ptm.id;

           
        `);

        res.status(200).json({
            msg: 'ok',
            count: rows.length,
            result: rows
        });
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

const InnerjoinTable1 = async (req, res) => {
    try {
        // Execute the SQL query to join tables
        const [rows] = await db.query(`
            SELECT event.*, ptm.id AS ptm_id, ptm.date AS ptm_date, ptm.meetingPerson, ptm.status, ptm.created_at AS ptm_created_at, ptm.updated_at AS ptm_updated_at
            FROM event 
            INNER JOIN ptm ON event.ptmId = ptm.id;
        `);

        // Transform the data to include ptm object
        const transformedRows = rows.map(row => {
            const {
                ptm_id,
                meetingPerson,
                status,
                startTime,
                ptm_created_at,
                ptm_updated_at,
                ...eventData
            } = row;

            return {
                ...eventData,
                ptm: {
                    id: ptm_id,
                    startTime: startTime,
                    endTime: startTime,
                    date: ptm_date,
                    meetingPerson,
                    status,
                    created_at: ptm_created_at,
                    updated_at: ptm_updated_at
                }
            };
        });

        res.status(200).json({
            msg: 'ok',
            count: transformedRows.length,
            result: transformedRows
        });
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};


module.exports = {
    createNotes,
    getNotes,
    updateNotesById,
    deleteNotesById,
    getNotesById,
    InnerjoinTable
}