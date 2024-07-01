const db = require("../../../db/db");
let secret = "manvisecreatkey";
const validator = require("validator");
// const handleFileUpload = require("../../../../../uploade");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");



const registration = async (req, res) => {
    try {
        let { firstName, lastName, email, password, phone } = req.body
        password = crypto.AES.encrypt(password, secret).toString()

        // let file = await uploadFile(req.files)
        // if (!file.file) return res.status(400).send({ msg: "please upload profile" })
        // file = file.file

        let [checkEmail] = await db.query("select * from user where email = ?", [email])
        if (checkEmail.length > 0) return res.status(400).send({ msg: "email already exist" })

        const [registration] = await db.query("insert into user(firstName,lastName, email, password,phone) values(?, ?, ?, ?,?)", [firstName, lastName, email, password, phone])

        return res.status(201).send({ msg: "ok", result: registration })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ msg: "email, password is required" })

        if (!validator.isEmail(email)) return res.status(400).json({ msg: "provide valid email" })

        const [login] = await db.query("select * from user where email = ?", [email])
        let userPassword = crypto.AES.decrypt(login[0].password, secret).toString(crypto.enc.Utf8)

        if (password != userPassword) return res.status(400).json({ msg: "password not correct" })

        let payload = { id: login[0].id, email: login[0].email }
        console.log("{ id: login[0].id, email: login[0].email }", payload)
        let token = jwt.sign(payload, secret)

        return res.status(201).send({ msg: "ok", result: login, token: token })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const allUsers = async (req, res) => {
    try {

        console.log("Entering allUsers function");

        const [allUser] = await db.query("SELECT * FROM user");

        // Log to confirm query execution
        console.log("Query executed");

        // Check if no users were found
        if (allUser.length === 0) return res.status(400).send({ msg: "user not found" });

        // Return the list of users
        return res.status(200).send({ msg: "ok", count: allUser.length, result: allUser });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in allUsers function:", error);

        // Return a 500 status with the error message
        return res.status(500).json({ error: error.message });
    }
};



const getUserById = async (req, res) => {
    try {
        console.log("useer------>>", req.user)
        const id = req.query.id; // Get the 'id' from the query parameters
        console.log("id==========>>", id);

        if (!id) {
            return res.status(400).json({ message: "ID parameter is required" });
        }

        const [user] = await db.query("SELECT * FROM user WHERE id = ?", [id]); // Use a parameterized query

        if (user.length === 0) {
            // If no user is found, return a 404 status
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user data
        return res.status(200).json({ msg: "ok", result: user[0] });
    } catch (error) {
        // Handle any errors that occur during the query
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getProfile = async (req, res) => {
    try {
        const { id } = req.users
        if (!id) return res.status(400).send({ msg: "something went wrong" })

        const [profile] = await db.query("select * from user where id = ?", [id])
        if (profile.length == 0) return res.status(400).send({ msg: "user not found" })

        return res.status(200).send({ msg: "ok", result: profile[0] })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({ msg: "provide file for update profile" })
        }

        let file = await upload(req.files)
        if (!file.file) return res.status(400).send({ msg: "please upload profile" })
        file = file.file
        const { id } = req.users

        const [update] = await db.query("update user set profile = ? where id = ?", [file, id])

        return res.status(201).send({ msg: "ok", result: update })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}




const activeOrDeactive = async (req, res) => {
    try {
        const { role } = req.users
        if (role != "admin") return res.status(400).send({ msg: "unauthorized" })
        const { id } = req.params

        let [user] = await db.query("select * from users where id = ?", [id])

        if (user.length == 0) return res.status(400).send({ msg: "user not found" })
        user = user[0]

        let isActive;

        if (user.isActive == 1) {
            isActive = 0
            let [deactivate] = await db.query("update users set isActive = ? where id = ?", [isActive, id])
            return res.status(201).send({ msg: "user deactivate successfully" })
        } else {
            isActive = 1
            let [deactivate] = await db.query("update users set isActive = ? where id = ?", [isActive, id])
            return res.status(201).send({ msg: "user active successfully" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//SELECT DISTINCT Country FROM Customers;

const getDistinctUser = async (req, res) => {
    try {
        // Execute the raw SQL query to get distinct first names
        // here which speacy feild like eamil firstName lastName 
        const [distinctFirstNames] = await db.query("SELECT DISTINCT email FROM user");

        res.status(200).json({
            msg: "Distinct first names retrieved successfully",
            result: distinctFirstNames
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error retrieving distinct first names",
            error: error.message
        });
    }
};


// with and oprate 

const getFilteredUsers = async (req, res) => {
    try {
        // Extract query parameters from the request
        const { firstName, lastName, email } = req.body;
        console.log("req========>>", req.body)
        // Construct the SQL query
        const query = `
            SELECT firstName, lastName, email
            FROM user
            WHERE firstName = ? AND lastName = ? AND email = ?;
        `;
        const [rows] = await db.query(query, [firstName, lastName, email]);
        // Send the response with the result
        console.log("rows=======>>", rows)
        res.status(200).json({
            msg: "Filtered users retrieved successfully",
            result: rows
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error retrieving filtered users",
            error: error.message
        });
    }
};

// in this any one feild will match it will return all data

const getFilteredUsersWithOrOprater = async (req, res) => {
    try {
        // Extract query parameters from the request
        const { firstName, lastName, email } = req.body;

        // Construct the SQL query with OR operator
        const query = `
            SELECT firstName, lastName, email
            FROM user
            WHERE firstName = ? OR lastName = ? OR email = ?;
        `;

        // Execute the query with the provided values
        const [rows] = await db.query(query, [firstName, lastName, email]);

        // Send the response with the result
        res.status(200).json({
            msg: "Filtered users retrieved successfully",
            result: rows
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error retrieving filtered users",
            error: error.message
        });
    }
};
// get data in ASCinding order
const getOrderBy = async (req, res) => {
    try {
        // Extract query parameters from the request
        const { orderColumn = 'firstName', orderDirection = 'ASC' } = req.query;

        // Default order direction to ASC if not provided
        const direction = orderDirection.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        // Construct the SQL query
        const query = `
            SELECT firstName, lastName
            FROM user
            ORDER BY ${orderColumn} ${direction};
        `;

        // Execute the query
        const [rows] = await db.query(query);

        // Send the response with the result
        res.status(200).json({
            msg: "Data retrieved and ordered successfully",
            result: rows
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error retrieving and ordering data",
            error: error.message
        });
    }
};



// in thsi i will get data in descing order Z TO A
const getOrderByDes = async (req, res) => {
    try {
        const { orderColumn } = req.query;

        const direction = 'DESC';

        const query = `
            SELECT firstName, lastName
            FROM user
            ORDER BY ${orderColumn || 'firstName'} ${direction};
        `;

        const [rows] = await db.query(query);

        res.status(200).json({
            msg: "Data retrieved and ordered successfully",
            result: rows
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error retrieving and ordering data",
            error: error.message
        });
    }
};


const insertInto = async (req, res) => {
    try {
        // Extract values from the request body
        const { firstName, lastName, email } = req.body;

        // Construct the SQL query for insertion
        const query = `
            INSERT INTO user (firstName, lastName, email)
            VALUES (?, ?, ?);
        `;

        // Execute the query
        const [result] = await db.query(query, [firstName, lastName, email]);

        // Send the response with the result
        res.status(200).json({
            msg: "Data inserted successfully",
            result
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error inserting data",
            error: error.message
        });
    }
};


const iSNULLSyntax = async (req, res) => {
    try {
        const { columnName } = req.query;
        console.log("columnName=======>>", columnName);

        const query = `
            SELECT *
            FROM user
            WHERE ${columnName} IS NULL;
        `;

        console.log("SQL Query:", query); // Log the generated SQL query

        const [rows] = await db.query(query);

        res.status(200).json({
            msg: "Query executed successfully",
            result: rows
        });
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).json({
            msg: "Error executing query",
            error: error.message
        });
    }
};

const fileUplaod = async (req, res) => {
    try {
        console.log("req.files=======>>", req.file)
        let uploadedFile = req.file;
        let urlPath = `/uploads/${uploadedFile.filename}`;

        console.log("File URL Path:", urlPath);

        return res.send({ url: urlPath });
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Error uploading file" });
    }
};


const updateProfile1 = async (req, res) => {
    try {
        // if (!req.files || Object.keys(req.files).length === 0) {
        //     return res.status(400).send({ msg: "Please provide a file for updating the profile" });
        // }

        // let file = await upload(req.files);
        // if (!file.file) return res.status(400).send({ msg: "Please upload a profile picture" });
        // file = file.file;

        const { id } = req.users; // Assuming this contains the user's ID
        const { firstName, lastName } = req.body; // Assuming firstName and lastName are in req.body

        // Update profile picture and personal information
        const [update] = await db.query("UPDATE user SET profile = ?, firstName = ?, lastName = ? WHERE id = ?", [file, firstName, lastName, id]);

        return res.status(201).send({ msg: "Profile updated successfully", result: update });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const getLimitedUsers = async (req, res) => {
    try {
        console.log("Entering allUsers function");

        const { page = 1, pageSize = 10 } = req.query;
        const limit = parseInt(pageSize, 10);
        const offset = (parseInt(page, 10) - 1) * limit;

        const query = "SELECT * FROM user LIMIT ? OFFSET ?";
        const [allUser] = await db.query(query, [limit, offset]);

        console.log("Query executed");

        if (allUser.length === 0) return res.status(400).send({ msg: "user not found" });

        return res.status(200).send({ msg: "ok", count: allUser.length, result: allUser });
    } catch (error) {
        console.error("Error in allUsers function:", error);

        return res.status(500).json({ error: error.message });
    }
};



const getMinValue = async (req, res) => {
    try {
        const { columnName } = req.query;
        console.log("columnName=======>>", columnName);

        if (!columnName) {
            return res.status(400).json({ msg: "Column name is required" });
        }

        // List of valid columns in the user table
        const validColumns = ["firstName", "lastName", "age", "email", "profile", "created_at", "updated_at"]; // Add all valid columns here

        if (!validColumns.includes(columnName)) {
            return res.status(400).json({ msg: `Invalid column name: ${columnName}` });
        }

        const query = `SELECT MIN(${columnName}) AS minValue FROM user`;
        const [rows] = await db.query(query);

        if (rows.length === 0) {
            return res.status(400).json({ msg: "No data found" });
        }

        return res.status(200).json({ msg: "Query executed successfully", minValue: rows[0].minValue });
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ msg: "Error executing query", error: error.message });
    }
};

const getMaxValue = async (req, res) => {
    try {
        const { columnName } = req.query;
        console.log("columnName=======>>", columnName);

        if (!columnName) {
            return res.status(400).json({ msg: "Column name is required" });
        }

        // List of valid columns in the user table
        const validColumns = ["firstName", "lastName", "age", "email", "profile", "created_at", "updated_at"]; // Add all valid columns here

        if (!validColumns.includes(columnName)) {
            return res.status(400).json({ msg: `Invalid column name: ${columnName}` });
        }

        const query = `SELECT MAX(${columnName}) AS max_value FROM user`;
        const [rows] = await db.query(query);

        if (rows.length === 0) {
            return res.status(400).json({ msg: "No data found" });
        }

        return res.status(200).json({ msg: "Query executed successfully", maxValue: rows[0].max_value });
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ msg: "Error executing query", error: error.message });
    }
}


const getLike = async (req, res) => {
    try {
        const { columnName, searchValue } = req.query;
        console.log("columnName=======>>", columnName);
        console.log("searchValue=======>>", searchValue);

        if (!columnName || !searchValue) {
            return res.status(400).json({ msg: "Column name and search value are required" });
        }

        // List of valid columns in the user table
        const validColumns = ["firstName", "lastName", "email"]; // Add all valid columns here

        if (!validColumns.includes(columnName)) {
            return res.status(400).json({ msg: `Invalid column name: ${columnName}` });
        }

        const query = `SELECT * FROM user WHERE ${columnName} LIKE '%${searchValue}%'`;
        const [rows] = await db.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ msg: "No data found" });
        }

        return res.status(200).json({ msg: "Data found", data: rows });
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ msg: "Error executing query", error: error.message });
    }
}

module.exports = {
    registration,
    login,
    fileUplaod,
    getProfile,
    updateProfile,
    allUsers,
    getLimitedUsers,
    getMinValue,
    getMaxValue,
    getUserById,
    activeOrDeactive,
    getDistinctUser,
    getFilteredUsers,
    getFilteredUsersWithOrOprater,
    getOrderBy,
    getOrderByDes,
    insertInto,
    iSNULLSyntax,
    getLike,
}

