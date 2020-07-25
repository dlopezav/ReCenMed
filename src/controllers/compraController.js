const controller = {};

controller.list = ((req, res) =>{
    if(req.session.user){
        req.getConnection((err, conn) =>{
            conn.query('select * from vista_info_proveedores; select * from empresa; select * from vista_productos_general where pro_id < 0; ', (err, rows) => {
                if(err){
    
                    const message = "Usted no tiene permiso para acceder a esta página";
                    // console.log("Usted no tiene permiso para acceder");
                    res.render('error.ejs', {message});
                }
                else{
                    res.render('compra.ejs', {
                        providers: rows[0],
                        enterprise: rows[1],
                        data: rows[2],
                        yo: rows[3],
                        buscando: false
                    });
                }
            });
        });
    }
    else{
        // const message = "Ningun usuario registrado";
        // res.render('error.ejs', {message});
        req.session.message = "Ningun usuario registrado";
        res.redirect('logout');
    }
});

controller.editProv = ((req, res) =>{
    var data = Object.values(req.body);
    console.log(data);
    const emprId = data.splice(5, 1);
    const id = data.splice(0, 1);
    const idProv = data.splice(0, 1);
    data.push(id);
    data.push(emprId);
    data.push(idProv);
    req.getConnection((err, conn) =>{
        conn.query('Update persona set per_nombre = ?, per_apellido = ?, per_telefono = ? where per_id = ?; Update proveedor set empr_id = ? where prov_id = ?', data, (err, rows) => {
            if(err){
                res.json(err);
            }
            else{
                res.redirect('/compras');
            }
        });
    });
});

controller.deleteProv = ((req, res) =>{
    var data = Object.values(req.body);
    req.getConnection((err, conn) =>{
        console.log(data);
        conn.query('call eliminar_proveedor(?)', data, (err, rows) => {
            if(err){
                const message = "Usted no puede realizar esa accion";
                res.render('error.ejs', {message});
            }
            else{
                res.redirect('/compras')
            }
        });
    });
});


controller.crearProv = ((req, res) =>{
    var data = Object.values(req.body);
    req.getConnection((err, conn) =>{
        console.log(data)
        conn.query('call crear_proveedor(?, ?, ?, ?)', data, (err, rows) => {
            if(err){
                res.json(err);
            }
            else{                
                res.redirect('/compras')
            }
        });
    });
});

controller.searchInCompra = ((req, res) =>{
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
        
        conn.query('select * from vista_info_proveedores; select * from empresa; ' + sql, data, (err, rows) =>{
            if (err) {
                res.json(err);
            }
            else{
                console.log('exitoso');
            }
            res.render('compra.ejs', {
                providers: rows[0],
                enterprise: rows[1],
                data: rows[2],
                yo: rows[3],
                buscando: true
            });
        });
    });
});
controller.comprar = ((req, res) =>{
    const data = Object.values(req.body);

    req.getConnection((err, conn) =>{
        conn.query('select (ifnull((select max(com_id) from compra), 0))+1 as SiguienteIndice', (err, info) => {
            if(err){
                res.json(err);
            }else{
                siguienteIdx = info[0].SiguienteIndice;
            }
            console.log(siguienteIdx);
            var idProveedor = data.splice(0,1);
            var sql  = '';
            for(var i = 0; i < (data.length/2); i++){
                sql += 'call compra('+siguienteIdx+', ?, ?);'
            }
            sql += 'call asignar_proveedor_a_compra('+siguienteIdx+', ?)';
            data.push(idProveedor);

            console.log(data);
            conn.query(sql, data, (err, rows) =>{
                if(err){
                    res.json(err);
                }
                else{
                    // sessionStorage.removeItem('ids');
                    res.redirect('/compras');
                }
                // res.render('compra.ejs', {
    
                // });
            });
        });

        
    });
});


module.exports = controller;


