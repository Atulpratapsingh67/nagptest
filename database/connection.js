const mysql = require('mysql2');
const con = mysql.createConnection({
        host:"testdatabase.cq3launkwzcx.ap-south-1.rds.amazonaws.com",
        port:"3306",
        user:"testdatabase",
        password:"testdatabase",
        multipleStatements: true
});

con.connect((err) =>{
        if (err) throw err;

        const query = 
        "CREATE DATABASE IF NOT EXISTS results;\
        USE results;\
        CREATE TABLE IF NOT EXISTS Result (rollnumber INTEGER AUTO_INCREMENT,\
                name VARCHAR(255) , date date,\
                score INTEGER, edit BOOLEAN,\
                primary key (rollnumber) );\
        "

        con.query(query, (err, result) => {
                if (err) throw err;
                });
});

module.exports = con;