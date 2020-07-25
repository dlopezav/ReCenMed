const controller = {};
// const { database } = require('../keys');
// const passport = require('passport');
// const pass = require('../lib/passport');

controller.list = ((req, res) =>{
    if(req.session.user){
        res.redirect('/productos');
    }
    else{
        // if(req.session.message)
        const message = req.session.message;
        delete req.session.message;
        // if(req.session.message)
        const success = req.session.success;
        delete req.session.success;
        console.log(message);
        console.log(success);
        res.render('signin.ejs', {message, success});
    }


    // res.render('signin.ejs');
});

controller.signin = ((req, res) =>{
    const nombre = req.body.username.split("_")[0];
    const apellido = req.body.username.split("_")[1] || "";
    
    req.getConnection((err, conn) =>{
            const pass = req.body.password;
            // const existe = (await db.query('select exist_usuario(?, ?) as tobe', [nombre, apellido]))[0].tobe;
            conn.query('select exist_usuario(?, ?) as tobe; select * from vista_info_usuarios_completa where ( lower(per_nombre) like ?) and (lower(per_apellido) like ?)', [nombre, apellido, nombre, apellido], (err, rows) =>{

                
                const existe = rows[0][0].tobe;
                const usu = rows[1][0];
                console.log(existe);
                if(existe){
                    // console.log("si");
                    console.log(usu);
                    if(usu.usu_password ==  pass){
                        
                        if(usu.activo){
                            req.session.user = usu;
                            var usuNombre = usu.per_nombre.toLowerCase() + "_" + usu.per_apellido.toLowerCase();
                            conn.changeUser({user : usuNombre, password: usu.usu_password}, function(err) {
                                if (err){
                                    console.log(conn);
                                    throw err;
                                }
                            });
                            res.redirect('/productos');
                        }
                        else{
                            const message = "este usuario fue eliminado";
                            res.render('error.ejs', {message});
                        }
                        
                        // conn.changeUser({user: user.usu_nombre, password: user.usu_password}, function(err){
                        //     if(err){
                        //         throw err;
                        //     }
                        // })

                    }
                    else{
                        console.log("false");
                        req.session.message = "Contraseña Incorrecta";
                        res.redirect('/');
                    }
                    // const user = await db.query('select * from vista_info_usuarios_completa where ( lower(per_nombre) like ?) and (lower(per_apellido) like ?)', [nombre, apellido]);
                    // req.getConnection((err, conn) =>{
                        // console.log("la pss es " + pass);
                        // conn.query('', [nombre, apellido], (err, rows) =>{
                            // const user = rows[0];
                            // if(pass == user.usu_password){       
                                //     req.session.usuario = user;
                                //     // console.log(user.usu_nombre + " " + user.usu_password);
                                //     res.redirect('/productos');
                                // }
                                // else{
                            //     console.log("fayo perrin");
                            //     req.session.message = 'Contraseña incorrecta';   
                            //     res.redirect('/signin');                             
                            // }
                        // });
                    // });
                }else{
                    console.log("ño");
                    req.session.message = "Usuario Inexistente";
                    res.redirect('/');
                    // req.session.message = 'Usuario inexistente';
                }
                
            });
    });
    // console.log(nombre + " " + apellido);
});

controller.logout = ( (req, res) =>{
    delete req.session.user;
    req.getConnection((err, conn) =>{
        conn.changeUser({user : 'root', password: '1905'}, function(err) {
            if (err) throw err;
            else{
                console.log("todo fine " + conn.port);
            }
        });
    });
    res.redirect('/');
});

module.exports = controller;
