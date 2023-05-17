const express = require('express');
const mysql = require('mysql');
const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "193.198.97.21",
  user: "nalic",
  password: "11",
  database:"nalic" 
});

// Connect to the MySQL database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Define an API endpoint to fetch data from the database
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM your_table';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Error fetching data from database' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
