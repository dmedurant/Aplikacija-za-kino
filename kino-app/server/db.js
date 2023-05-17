const mysql = require('mysql')
const db = mysql.createConnection({
host: "193.198.97.21",
user: "nalic",
password: "11",
database:"nalic" 
})

module.exports = db;
