const db = require("../../../db/db")

const addEvent = async (req, res) => {
    try {
        let {
            eventName,
            eventType,
            venue } = req.body
        console.log("req.body========>>", req.body)
        const [result] = await db.query("insert into event(eventName, eventType, venue) values(?, ?,  ?)", [
            eventName,
            eventType,
            venue])

        return res.status(201).send({ msg: "ok", result: result })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getEvent = async (req, res) => {
    try {

        const [allEvent] = await db.query("select * from event")// where role = ?", [userRole])
        if (allEvent.length == 0) return res.status(400).send({ msg: "user not found" })

        return res.status(200).send({ msg: "ok", count: allEvent.length, result: allEvent })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateById = async (req, res) => {
    try {
        const { id } = req.params; // Assume event ID is passed as a URL parameter
        const { eventType, eventName, eventPlace } = req.body;

        if (!id || !eventType || !eventName || !eventPlace) {
            return res.status(400).send({ msg: "Missing required fields" });
        }

        const query = `
            UPDATE event
            SET eventName = ?, eventType = ?, venue = ?
            WHERE id = ?
        `;

        const [result] = await db.query(query, [eventName, eventType, eventPlace, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ msg: "Event not found" });
        }

        return res.status(200).send({ msg: "Event updated successfully", result: result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const deleteEventById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ msg: "Event ID is required" });
        }

        const query = "DELETE FROM event WHERE id = ?";
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ msg: "Event not found" });
        }

        return res.status(200).send({ msg: "Event deleted successfully", result: result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const getDataById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ msg: "Event ID is required" });
        }

        const query = "SELECT * FROM event WHERE id = ?";
        const [rows] = await db.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).send({ msg: "Event not found" });
        }

        return res.status(200).json({ msg: "Event retrieved successfully", event: rows[0] });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getDataByLimit = async (req, res) => {
    try {
        console.log("Entering allUsers function");

        const { page = 1, pageSize = 10 } = req.query;
        const limit = parseInt(pageSize, 10);
        const offset = (parseInt(page, 10) - 1) * limit;

        const query = "SELECT * FROM event LIMIT ? OFFSET ?";
        const [allUser] = await db.query(query, [limit, offset]);

        console.log("Query executed");

        if (allUser.length === 0) return res.status(400).send({ msg: "user not found" });

        return res.status(200).send({ msg: "ok", count: allUser.length, result: allUser });
    } catch (error) {
        console.error("Error in allUsers function:", error);

        return res.status(500).json({ error: error.message });
    }
}

const filterDataByDate = async (req, res) => {
    try {
        let { date } = req.query;
        console.log("Entering filterDataByDate function");

        // Ensure date is in the correct format and valid
        if (!date) {
            return res.status(400).json({ msg: "Date parameter is required" });
        }

        const query = "SELECT * FROM event WHERE eventDate = ?";


        const [events] = await db.query(query, [date]);

        console.log("Query executed");

        if (events.length === 0) {
            return res.status(404).json({ msg: "No events found for the specified date" });
        }

        return res.status(200).json({ msg: "Success", count: events.length, events });
    } catch (error) {
        console.error("Error in filterDataByDate function:", error);
        return res.status(500).json({ error: error.message });
    }
};

const filterDataByEventType = async (req, res) => {
    try {
        let { eventType } = req.query;
        console.log("Entering filterDataByDate function");

        // Ensure date is in the correct format and valid
        if (!eventType) {
            return res.status(400).json({ msg: "Date parameter is required" });
        }

        const query = "SELECT * FROM event WHERE eventType = ?";


        const [events] = await db.query(query, [eventType]);

        console.log("Query executed");

        if (events.length === 0) {
            return res.status(404).json({ msg: "No events found for the specified date" });
        }

        return res.status(200).json({ msg: "Success", count: events.length, events });
    } catch (error) {
        console.error("Error in filterDataByeventType function:", error);
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addEvent,
    getEvent,
    updateById,
    deleteEventById,
    getDataById,
    getDataByLimit,
    filterDataByDate,
    filterDataByEventType

}