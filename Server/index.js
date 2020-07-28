const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const conecctionDatabase = require('express-myconnection');
const app = express();
const bodyParser = require('body-parser');
const rout = require('./routes/routProof.js')
// const session = require('express-session');
// const http = require('http');
// const server = http.createServer(app);

//importing route
//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
const router = express.Router();

//middelwares


app.use(morgan('dev'));
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
app.use('/', rout);


// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(5000, () => {
    console.log("server started on port 5000");
});