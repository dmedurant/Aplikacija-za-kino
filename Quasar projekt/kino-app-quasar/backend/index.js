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


  // Ovo riješava problem: 
// Origin <origin> is not allowed by Access-Control-Allow-Origin
// from origin 'http://localhost:3000' has been blocked by CORS policy
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// kraj fix-a


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

  
  // unos filma
  app.post('/unosFilm', function (request, response) {
    const data = request.body;
    film = [[data.naslov, data.sadrzaj, data.datumObjave, data.trajanje]]
    
    dbConn.query('INSERT INTO Film  (Naslov, Sadrzaj, DatumObjave, VrijemeTrajanja) VALUES ? ',
    [film], function (error, results, fields) {
    if (error) throw error;
    return response.send({ error: false, data: results, message:'Unesen film.' });
    });
  });
  
// prikaz:
  app.get('/redatelji', (req,res)=>{
    dbConn.query("Select * from Redatelj", (err,result)=>{
        if(err){
            res.send('error');
        }else{
            res.send(result);
        }
    });
});

app.get('/filmovi', (req,res)=>{
  dbConn.query("SELECT * from Film", (err,result)=>{
      if(err){
          res.send('error');
      }else{
          res.send(result);
      }
  });
});

app.get('/film/:id', (req, res) => {
  const { id } = req.params;
  dbConn.query(
    "SELECT * from Film WHERE ID_Film = ?", [id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


app.get('/available-dates/:id', (req, res) => {
  const { id } = req.params;
  dbConn.query(
    "SELECT DatumPrikaza, vrijeme_prikaza from prikazivanje WHERE id_filma = ?", [id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});




app.post('/unosRezervacije', function (request, response) {
  const data = request.body;
  rezervacija = [[data.ID_Film, data.korisnik]]
  
  dbConn.query('INSERT INTO Film  (Naslov, Sadrzaj, DatumObjave, VrijemeTrajanja) VALUES ? ',
  [film], function (error, results, fields) {
  if (error) throw error;
  return response.send({ error: false, data: results, message:'Unesen film.' });
  });
});


app.delete('/obrisi_film/:id', function (request, response){

    let ID_Film = request.params.id;
  
    console.log(`Received request to delete atrakcija with id: ${ID_Film}`); // Log the received id
  
    if (!ID_Film) {
      return response.status(400).send({ error: true, message: 'nedostaje id ' });
    }
  
   const deleteQuery = "DELETE  FROM Film WHERE ID_Film = ?";
     //const deleteQuery = "DELETE  FROM atrakcije WHERE id_atrakcije = '${id}'";
    dbConn.query(deleteQuery, [ID_Film], function (error, results) {
      if (error) {
        console.log(`Error when executing the delete query: ${error}`); // Log any error from the query
        throw error;
      }
  
      console.log('Deletion result: ${JSON.stringify(results)}'); // Log the result of the deletion
  
      return response.send({ error: false, data: results, message: 'atrakcija je obrisana obrisi_atrakcije.' });
    });
  });


// unos korisnika
app.post('/unosKorisnika', function (request, response) {
    const data = request.body;
    korisnik = [[data.ime, data.prezime, data.adresa, data.broj]]
    
    dbConn.query('INSERT INTO Korisnik  (Ime, Prezime, Adresa, Broj) VALUES ? ',
    [korisnik], function (error, results, fields) {
    if (error) throw error;
    return response.send({ error: false, data: results, message:'Unesen korisnik.' });
    });
  });


app.post('/login', function (request, response) {
  const data = request.body;
  user = [[data.username]]
  pass = [[data.password]]
  dbConn.query('Select * from Login  where username = ? & password  = ? ',
  [user], req.params.password, function (error, results, fields) {
  if (error) throw error;
  return response.send({ error: false, data: results, message:'Korisnik postoji!.' });
  });
});


app.get("get-film/:id", (req, res) => {
  const { id } = req.params;

  dbConn.query(
    "SELECT Naslov, cover  WHERE ID_Film = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


/*
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




