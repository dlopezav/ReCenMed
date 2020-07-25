
const controller = {};

controller.list = ((req, res) =>{
    if(req.session.user){
        req.getConnection((err, conn) =>{
            conn.query('select * from vista_info_clientes; select * from vista_productos_general where pro_id < 0;', (err, rows) => {
                if(err){
                    res.json(err);
                }
                else{
                    res.render('venta.ejs', {
                        customers: rows[0],
                        data: rows[1],
                        buscando: false
                    });
                }
            });
        });
    }else{
        req.session.message = "Ningun usuario registrado";
        res.redirect('logout');
        // res.render('error.ejs', {message});
    }
});

controller.editCliente = ((req, res) =>{
    var data = Object.values(req.body);
    console.log(data);
    const id = data.splice(0, 1);
    data.push(id);
    req.getConnection((err, conn) =>{
        conn.query('Update persona set per_nombre = ?, per_apellido = ?, per_telefono = ? where per_id = ?;', data, (err, rows) => {
            if(err){
                res.json(err);
            }
            else{
                res.redirect('/ventas');
            }
        });
    });
});

controller.deleteCliente = ((req, res) =>{
    var data = Object.values(req.body);
    req.getConnection((err, conn) =>{
        console.log(data);
        conn.query('call eliminar_cliente(?)', data, (err, rows) => {
            if(err){
                res.json(err);
                const message = "Usted no puede realizar esa accion";
                res.render('error.ejs', {message});
            }
            else{
                res.redirect('/ventas')
            }
        });
    });
});


controller.crearCliente = ((req, res) =>{
    var data = Object.values(req.body);
    req.getConnection((err, conn) =>{
        console.log(data)
        conn.query('call crear_cliente(?, ?, ?)', data, (err, rows) => {
            if(err){
                res.json(err);
            }
            else{                
                res.redirect('/ventas')
            }
        });
    });
});

controller.searchInVenta = ((req, res) =>{
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
        
        conn.query('select * from vista_info_clientes;' + sql, data, (err, rows) =>{
            if (err) {
                res.json(err);
            }
            else{
                console.log('exitoso');
            }
            res.render('venta.ejs', {
                customers: rows[0],
                data: rows[1],
                yo: rows[2],
                buscando: true
            });
        });
    });
});
controller.vender = ((req, res) =>{
    const data = Object.values(req.body);

    req.getConnection((err, conn) =>{
        conn.query('select (ifnull((select max(ven_id) from venta), 0))+1 as SiguienteIndice;', (err, info) => {
            if(err){
                res.json(err);
            }else{
                siguienteIdx = info[0].SiguienteIndice;
            }
            var idCliente = data.splice(0,1);
            var sql  = '';
            for(var i = 0; i < (data.length/2); i++){
                sql += 'call vende('+siguienteIdx+', ?, ?);'
            }
            sql += 'call asignar_cliente_a_venta('+siguienteIdx+', ?)';
            data.push(idCliente);

            conn.query(sql, data, (err, rows) =>{
                if(err){
                    res.json(err);
                }
                else{
                    res.redirect('/ventas');
                }
            });
        });

        
    });
});


module.exports = controller;


