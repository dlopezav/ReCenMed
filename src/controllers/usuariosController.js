const controller = {};

controller.list = ((req, res) =>{

    if(req.session.user){

        req.getConnection((err, conn) =>{
            conn.query('select * from vista_info_usuarios_completa;', (err, rows) => {
                usuarios = rows;
                if(err){
                    const message = "Usted no tiene permiso para acceder a esta página";
                    res.render('error.ejs', {message});
                }
                else{
                    
                    res.render('usuarios.ejs', {
                        users: rows
                    });
                }
            });
        });
    }else{
        req.session.message = "Ningun usuario registrado";
        res.redirect('logout');
    }
});
controller.addUsuario = ((req, res) =>{
    const data = Object.values(req.body);
    console.log(req.body);
    console.log(data);
    req.getConnection((err, conn) =>{
        conn.query('call crear_usuario(?,?,?,?,?,?);', data, (err, rows) => {
            if(err){
                res.json(err);
                // const mensaje = "Usted no puede acceder a esta página";
                // res.render('error.ejs', {mensaje});
            }
            else{
                res.redirect('/usuarios');
            }
        });
    });
});

controller.eliminarUsuario = ((req, res) =>{
    // const data = Objet.values(req.body);
    console.log(req.body);
    req.getConnection((err, conn) =>{
        conn.query('call eliminar_usuario(?);', [req.body.usu_id], (err, rows) => {
            if(err){
                res.json(err);
                // const mensaje = "Usted no puede acceder a esta página";
                // res.render('error.ejs', {mensaje});
            }
            else{
                res.redirect('/usuarios');
            }
        });
    });
});
module.exports =  controller;