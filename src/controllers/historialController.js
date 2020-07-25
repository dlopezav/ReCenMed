const controller = {};


controller.list = ((req, res) => {
    if(req.session.user){

        req.getConnection((err, conn) =>{    
    
            conn.query('select * from vista_detalles_ventas_resumida ; select * from vista_detalles_compras_resumida; select * from vista_ventas order by ven_fecha, costo asc; select * from vista_compras order by com_fecha, costo asc; ', (err, rows) =>{
                if(err){
                    res.json(err);
                }
                res.render('historial.ejs', {
                    detailSales: rows[0],
                    detailPurchases: rows[1],
                    sales: rows[2],
                    purchases: rows[3],
                    yo: rows[4]
                });
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

module.exports = controller;