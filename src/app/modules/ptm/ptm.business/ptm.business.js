const db = require("../../../db/db")

const addPtm = async (req, res) => {
    try {
        // Destructure the required fields from req.body
        const { venue, startTime, endTime, description, meetingPerson } = req.body;

        // Check if required fields are present in req.body
        if (!venue || !startTime || !endTime || !description || !meetingPerson) {
            throw new Error("Please provide all required fields: venue, startTime, endTime, description, meetingPerson");
        }

        // Perform the database insertion query
        const [result] = await db.query(
            "INSERT INTO ptm (venue, startTime, endTime, description, meetingPerson) VALUES (?, ?, ?, ?, ?)",
            [venue, startTime, endTime, description, meetingPerson]
        );

        // Send response on successful insertion
        res.status(200).json({ msg: "Record added successfully", result: result });

    } catch (error) {
        // Handle errors and send appropriate response
        console.error("Error adding PTM record:", error);
        res.status(500).json({ error: error.message });
    }
};

const getPtmList = async (req, res) => {
    try {
        const [allPtm] = await db.query("SELECT * FROM ptm");
        res.status(200).json({ msg: "ok", count: allPtm.length, result: allPtm });
    } catch (error) {
        console.error("Error fetching PTM list:", error);
        res.status(500).json({ msg: "Error fetching PTM list", error: error.message });
    }
};

const updatePtmById = async (req, res) => {
    const { id } = req.params; // Assuming id is passed as a route parameter
    const { venue, startTime, endTime, description, meetingPerson } = req.body;

    try {
        // Check if any of the required fields are missing in the request body
        if (!venue || !startTime || !endTime || !description || !meetingPerson) {
            return res.status(400).json({ msg: "Please provide all required fields: venue, startTime, endTime, description, meetingPerson" });
        }

        // Update the PTM record in the database
        const query = `
            UPDATE ptm
            SET venue = ?, startTime = ?, endTime = ?, description = ?, meetingPerson = ?
            WHERE id = ?
        `;
        const [result] = await db.query(query, [venue, startTime, endTime, description, meetingPerson, id]);

        // Check if the update was successful
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: `PTM with ID ${id} not found` });
        }

        // Return success response
        res.status(200).json({ msg: "PTM record updated successfully", result: result });

    } catch (error) {
        console.error("Error updating PTM record:", error);
        res.status(500).json({ msg: "Error updating PTM record", error: error.message });
    }
};

const deletePtmById = async (req, res) => {
    const { id } = req.params; // Extract PTM ID from request parameters

    try {
        // Delete the PTM record from the database
        const query = "DELETE FROM ptm WHERE id = ?";
        const [result] = await db.query(query, [id]);

        // Check if a record was deleted
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: `PTM with ID ${id} not found` });
        }

        // Return success response
        res.status(200).json({ msg: `PTM with ID ${id} deleted successfully` });

    } catch (error) {
        console.error("Error deleting PTM record:", error);
        res.status(500).json({ msg: "Error deleting PTM record", error: error.message });
    }
};

const getPtmById = async (req, res) => {
    const { id } = req.params; // Extract PTM ID from request parameters

    if (!id) {
        return res.status(400).json({ msg: "ID parameter is required" });
    }

    try {
        // Fetch the PTM record from the database based on ID
        const query = "SELECT * FROM ptm WHERE id = ?";
        const [ptm] = await db.query(query, [id]);

        // Check if a record was found
        if (ptm.length === 0) {
            return res.status(404).json({ msg: `PTM with ID ${id} not found` });
        }

        // Return success response with the PTM record
        res.status(200).json({ msg: `PTM with ID ${id} found`, result: ptm[0] });

    } catch (error) {
        console.error("Error fetching PTM record:", error);
        res.status(500).json({ msg: "Error fetching PTM record", error: error.message });
    }
};


module.exports = {
    addPtm,
    getPtmList,
    updatePtmById,
    deletePtmById,
    getPtmById
}
