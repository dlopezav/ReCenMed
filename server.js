const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const mysql = require('mysql');
const conecctionDatabase = require('express-myconnection');
const app = express();
const bodyParser = require('body-parser');
// const rout = require('./routes/routProof.js')
// const session = require('express-session');
// const http = require('http');
// const server = http.createServer(app);

//importing route
//settings
app.set('port', process.env.PORT || 3000);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
const router = express.Router();

//middelwares


// app.use(morgan('dev'));
app.use(conecctionDatabase(mysql, {
    host: '25.92.99.155',
    user: 'root',
    password: 'hack2020',
    port: 3306,
    database: 'recenmeddb',
    multipleStatements: true
}, 'single'));




app.use(express.urlencoded({ 
        extended: false
    }
));
app.use(bodyParser.json());

//satatic files
// app.use(express.static(path.join(__dirname, 'public')));

//routes
// app.use('/', rout);


// add middlewares
// app.use(express.static(path.join(__dirname, "..", "build")));


app.get('/getUsers', (req, res) => {
    req.getConnection((err, conn) => {
      conn.query('select * from users', (err, rows) => {
        if(err){
          console.log(err.json())
        }
        else{
          res.json(rows);
        }
      })
    });
});

app.get('/getHospitals', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select hos_name, hos_address, hos_lat, hos_lng, hos_email, hos_date from hospitals', (err, rows) => {
      if(err){
        console.log(err.json())
      }
      else{
        res.json(rows);
      }
    })
  });
});


app.post('/confirmLogin', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select * from hospitals where hos_email like ?',[req.body.email], (err, rows) => {
      if(err){
        console.log(err.json())
      }
      else{
        myHospital = rows[0]
        if(rows[0].hos_password == req.body.password){
          myHospital.confirm = true;
        }
        else{
          myHospital.confirm = false;
        }
        // console.log(myHospital)
        res.send(myHospital)
      }
    })
  });
});

app.post('/getUnities', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select * from unities where uni_hos_id = ?',[req.body.id], (err, rows) => {
      if(err){
        console.log(err.json());
      }
      else{
        res.send(rows);
      }
    })
  }); 
});

app.post('/getSpecialities', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select * from specialities where spc_hos_id = ?',[req.body.id], (err, rows) => {
      if(err){
        console.log(err.json());
      }
      else{
        res.send(rows);
      }
    })
  });
});
app.use(express.static(__dirname + "/public"));

app.listen(3000, () => {
    console.log("server started on port 3000");
});