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
// const producto_routes = require('./routes/producto.js');
// const compra_routes = require('./routes/compra.js');
// const venta_routes = require('./routes/venta.js');
// const historial_routes = require('./routes/historial.js');
const autenticacion_routes = require('./routes/autenticacion.js');
// const usuarios_routes = require('./routes/usuarios.js');


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
    user: 'leonardo',
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


//routes
// app.use('/', producto_routes);
// app.use('/', compra_routes);
// app.use('/', venta_routes);
// app.use('/', historial_routes);
app.use('/', autenticacion_routes);
// app.use('/', usuarios_routes);

server.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});


