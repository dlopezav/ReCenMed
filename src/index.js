const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const conecctionDatabase = require('express-myconnection');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');
const server = http.createServer(app);

//importing routes
const producto_routes = require('./routes/producto.js');
const compra_routes = require('./routes/compra.js');
const venta_routes = require('./routes/venta.js');
const historial_routes = require('./routes/historial.js');
const autenticacion_routes = require('./routes/autenticacion.js');
const usuarios_routes = require('./routes/usuarios.js');


//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middelwares

app.use(session({
    secret: 'leonardoDelgado',
    resave: false,
    saveUninitialized: false
}));


app.use(morgan('dev'));
app.use(conecctionDatabase(mysql, {
    host: '25.92.99.155',
    user: 'root',
    password: 'hack2020',
    port: 3306,
    database: 'recenmeddb',
    multipleStatements: true
}, 'single'));


var myConnection = function (req, res, next) {
    req.getConn = function(callback){
        var connection = mysql.createConnection({
                            host: 'localhost',
                            user: 'root',
                            password: '1905',
                            port: 3306,
                            database: 'drogueria',
                            multipleStatements: true
                        });
        callback(null, connection);
        // return connection;
    }
    var end = res.end;
    res.end = function (data, encoding) {
        res.end = end;
        res.end(data, encoding);
    }
    next(); 
}
app.use(myConnection);
app.use(express.urlencoded({ 
        extended: false
    }
));
app.use(bodyParser.json());

//Variables Globales
app.use((req, res, next) =>{
    app.locals.usuario = req.session.user;
    next();
});

//routes
app.use('/', producto_routes);
app.use('/', compra_routes);
app.use('/', venta_routes);
app.use('/', historial_routes);
app.use('/', autenticacion_routes);
app.use('/', usuarios_routes);

//satatic files
app.use(express.static(path.join(__dirname, 'public')));


server.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});

