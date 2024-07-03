# DOWNLOAD XAMPP CONTROLL PANNEL download and make datbases name and tabel name 


# What is SQL?
SQL is the standard language for dealing with Relational Databases.

SQL is used to insert, search, update, and delete database records.

# while using this query i can get list of table

SELECT * FROM Customers;
SELECT * FROM table_name;


# while using this query i will get onlt spacif feild from the table

SELECT CustomerName, City, Country FROM Customers;

# while using DISTINCT we can get specfic feild  liek email firstName lastName what ever feild we want to egt we can write this quey and we can get

# SELECT DISTINCT
// SELECT DISTINCT email FROM user

# AND oprate in this it will be find all query what we will give if all query will match then it will be return 
SELECT firstName, lastName, email FROM user WHERE firstName = ? AND lastName = ? AND email = ?;

# OR oprate in this any one feild will match it will be retun all data
 const query = `
            SELECT firstName, lastName, email
            FROM user
            WHERE firstName = ? OR lastName = ? OR email = ?;
        `;

 # ORDER BY 
 in this oprate i will get data  Ascending to descing and descing to asending       
 const query = `
            SELECT firstName, lastName
            FROM user
            ORDER BY ${orderColumn} ${direction};
        `;


 # The MySQL LIMIT 
 it will be return limitid data from list how much we want we can pass limit        

 SELECT column_name(s)
FROM table_name
WHERE condition
LIMIT number;


  const { page = 1, pageSize = 10 } = req.query;
        const limit = parseInt(pageSize, 10);
        const offset = (parseInt(page, 10) - 1) * limit;

        const query = "SELECT * FROM user LIMIT ? OFFSET ?";
        const [allUser] = await db.query(query, [limit, offset]);




# INNER JOIN QUERY
  const [rows] = await db.query(`
            SELECT * FROM event INNER JOIN ptm ON event.ptmId = ptm.id;
           
        `);