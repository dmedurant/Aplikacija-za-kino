// ovo treba biti pokrenuto kako bi Axios radio
// pokreće se sa: node index.js
const mysql = require('mysql');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
const dbConfig = require("./dbConfig");
const cors = require('cors');
app.use(cors());

app.use(cors({
    origin: 'http://localhost:8080'
}));

var dbConn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//spajanje s bazom ->radi -> u konozoli javlja ako se uspjesno spaja na bazu
dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


  // unos redatelja
  app.post('/unosRedatelja', function (request, response) {
    const data = request.body;
    redatelj = [[data.ime, data.prezime, data.biografija]]
    
    dbConn.query('INSERT INTO Redatelj  (Ime, Prezime, Biografija) VALUES ? ',
    [redatelj], function (error, results, fields) {
    if (error) throw error;
    return response.send({ error: false, data: results, message:'Unesen redatelj.' });
    });
  });
  

/*

app.post('/unosKorisnika', function (request, response) {
  const data = request.body;
  korisnik = [[data.username, data.pass]]
  
  dbConn.query('INSERT INTO Login  (username, pass) VALUES ? ',
  [korisnik], function (error, results, fields) {
  if (error) throw error;
  return response.send({ error: false, data: results, message:'Uneseno.' });
  });
});


//uzimanje podataka o korisnicima
app.get("/korisnici", function (request, response) {
    dbConn.query("SELECT * FROM korisnici", function (error, results, fields) {
        if (error) throw error;
        return response.send({
            error: false,
            data: results,
            message: "lista korisnika.",
        });
    });
});

*/

//port na kojem je app
app.listen(3000, function () {
console.log('Node app is running on port 3000');
});




