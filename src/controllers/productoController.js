const controller = {};

controller.list = ((req, res) => {
    // var connection =  req.createConnection( { multipleStatements: true } );
    if(req.session.user){

        req.getConnection((err, conn) => {
            conn.query('select * from vista_productos_general; select * from categoria; ', (err, rows) =>{
                console.log(rows[1], rows[2]);
                if (err) {
                    res.json(err);
                }
                res.render('producto.ejs', {
                    data: rows[0],
                    categorias: rows[1],
                    yo: rows[2],
                });
            });
        });
    }else{
        // const message = "Ningun usuario registrado";
        // res.render('error.ejs', {message});
        req.session.message = "Ningun usuario registrado";
        res.redirect('logout');
    }
});

controller.save = ((req, res) => {
    req.getConnection((err, conn) =>{
        console.log(req.body);
        req.body.pro_prescripcion = Boolean(req.body.pro_prescripcion);
        const data = req.body;
        conn.query('INSERT INTO producto set ?', [data], (err, prod) => {
            if(err){
                const message = "Usted no puede realizar esa accion";
                res.render('error.ejs', {message});
            }
            else{
                res.redirect('/productos');
            }
            console.log(prod);
        });        
    });
});

controller.search = ((req, res) =>{

    var sql = 'SELECT * FROM vista_productos_general where pro_nombre LIKE ? and pro_precio_venta > ? and pro_precio_venta < ?';
    req.body.pro_nombre = "%" + req.body.pro_nombre.toLowerCase() + "%";
    var data = Object.values(req.body);
    var conditions = ['pro_nombre LIKE ?', 'pro_precio_venta > ?', 'pro_precio_venta < ?'];
    if(req.body.pro_categoria != "null"){
        conditions.push('cat_nombre LIKE ?')
    }
    else data.splice(3, 1);
    if(req.body.pro_prescripcion != "null"){
        conditions.push('pro_prescripcion = ?');
    }        
    else data.pop();
    var sql = "SELECT * FROM vista_productos_general " + (conditions.length ? ("WHERE " + conditions.join(" AND ")) : "");
    // console.log(data);
    req.getConnection((err, conn) =>{       
        
        conn.query(sql + '; select * from categoria;', data, (err, rows) =>{
            if (err) {
                const message = "Usted no puede realizar esa accion";
                res.render('error.ejs', {message});
            }
            else{
                console.log('exitoso');
                res.render('producto.ejs', {
                    data: rows[0],
                    categorias: rows[1],
                    yo: rows[2],
                });
            }            
        });
    });
});

controller.update = ((req, res) => {
    req.body.pro_prescripcion = Boolean(req.body.pro_prescripcion);
    var data = Object.values(req.body);
    const id = data.splice(0, 1);
    data.push(id);
    req.getConnection((err, conn) =>{
        console.log(data);
        console.log(id);
        conn.query('Update producto set pro_nombre = ?, pro_presentacion = ?, pro_precio_venta = ?, pro_precio_compra = ?, pro_categoria = ?, pro_prescripcion = ? where pro_id = ?', data, (err, prod) => {
            if(err){
                const message = "Usted no puede realizar esa accion";
                res.render('error.ejs', {message});
            }
            else{
                res.redirect('/productos');
            }
            console.log(prod);
        });        
    });
});


controller.delete = ((req, res) => {
    
    var data = Object.values(req.body);
    req.getConnection((err, conn) =>{
        conn.query('Delete from producto where pro_id = ?', data, (err, prod) => {
            if(err){
                const message = "Usted no puede realizar esa accion";
                res.render('error.ejs', {message});
            }
            else{
                res.redirect('/productos');
            }
            console.log(prod);
        });        
    });
});

module.exports = controller;