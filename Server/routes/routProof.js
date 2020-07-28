var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ((req, res) =>{
    console.log("hola");
    req.getConnection((err, conn) =>{
        if(err){
            console.log("err")
        }
        else{
            conn.query('select * from users', (err, rows) => {
                if(err){
    
                    const message = "Usted no tiene permiso para acceder a esta página";
                    // console.log("Usted no tiene permiso para acceder");
                    res.render('error.ejs', {message});
                }
                else{
                    res.send("hola, gracias por ingresar")
                    console.log(rows);
                }
            });
        }
    });
}));


router.post('/reg', function(req, res, next) {
    console.log("papiiii");
    next;
});
module.exports = router;