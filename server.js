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
// app.use(conecctionDatabase(mysql, {
//     host: '25.92.99.155',
//     user: 'root',
//     password: 'hack2020',
//     port: 3306,
//     database: 'recenmeddb',
//     multipleStatements: true
// }, 'single'));




app.use(express.urlencoded({ 
        extended: false
    }
));
app.use(bodyParser.json());




// app.get('/getUsers', (req, res) => {
//     req.getConnection((err, conn) => {
//       conn.query('select * from users', (err, rows) => {
//         if(err){
//           console.log(err.json())
//         }
//         else{
//           res.json(rows);
//         }
//       })
//     });
// });

app.get('/getHospitals', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select hos_name, hos_address, hos_lat, hos_lng, hos_email, hos_date from hospitals', (err, rows) => {
      if(err){
        console.log(err.json())
      }
      else{
        res.json({
          hos_name: "EUSALUD CLÍNICA DE TRAUMATOLOGÍA Y ORTOPEDIA",
          hos_address: "Cra. 78 #3a40, Bogotá, Mandalay",
          hos_lat: 4.627478,
          hos_lng: -74.145048,
          hos_email: null,
          hos_date: "2020-07-31T18:28:17.000Z",
          })
        // res.json(rows);
      }
    })
  });
});


// app.post('/confirmLogin', (req, res) => {
//   req.getConnection((err, conn) => {
//     conn.query('select * from hospitals where hos_email like ?',[req.body.email], (err, rows) => {
//       if(err){
//         console.log({confirm: false})
//       }
//       else{
//         myHospital = rows[0]
//         if(myHospital){
//           if(rows[0].hos_password == req.body.password){
//             myHospital.confirm = true;
//           }
//         }
//         else{
//           myHospital = {confirm: false}
//         }
//         // console.log(myHospital)
//         res.send(myHospital)
//       }
//     })
//   });
// });


// app.post('/confirmRegister', (req, res) => {
//   // console.log(req.body)
//   data = Object.values(req.body)
//   console.log(data)
//   req.getConnection((err, conn) => {
//     conn.query('insert into hospitals (hos_name, hos_email, hos_password, hos_address, hos_lat, hos_lng) values ?',[[data]], (err, rows) => {
//       if(err){
//         console.log(err)
//         res.send(false)
//       }
//       else{
//         res.send(true)
//       }
//     })
//   });
// });

// app.post('/getUnities', (req, res) => {
//   req.getConnection((err, conn) => {
//     conn.query('select * from unities where uni_hos_id = ?',[req.body.id], (err, rows) => {
//       if(err){
//         console.log(err.json());
//       }
//       else{
//         res.send(rows);
//       }
//     })
//   }); 
// });


// app.post('/getSpecialities', (req, res) => {
//   req.getConnection((err, conn) => {
//     conn.query('select * from specialities where spc_hos_id = ?',[req.body.id], (err, rows) => {
//       if(err){
//         console.log(err);
//       }
//       else{
//         res.send(rows);
//       }
//     })
//   });
// });

// app.post('/actualizarDatos', (req, res) => {
//   data = Object.values(req.body)
//   sql = "update unities set uni_capacity_total = ? , uni_capacity_assigned = ? where (uni_hos_id = ?) and (uni_name = ?);     update specialities set spc_doctor = ? where (spc_hos_id = ?) and (spc_name = ?);";
//   sql2 = "update unities set uni_capacity_total = ? , uni_capacity_assigned = ? where (uni_hos_id = ?) and (uni_name = ?);     update specialities set spc_doctor = ? where (spc_hos_id = ?) and (spc_name = ?); insert into specialities (spc_hos_id, spc_name, spc_doctor) values ?"
//   req.getConnection((err, conn) => {
//     var sentence = "";
//     if(req.body.spe != null){
//       sentence = sql2;
//     }else{
//       sentence = sql;
//     }
//     conn.query(sentence, data, (err, rows) => {
//       if(err){
//         res.send(false)
//         console.log(err)
//       }
//       else{
//         res.send(true);
//       }
//     })
//   });
// });

app.use(express.static(__dirname + "/public"));

app.listen(app.get("port"), () => {
    console.log("server started on port 3000");
});