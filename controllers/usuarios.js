const {request, response}= require('express');
const Usuario = require ('../models/usuario');
const bcrypt= require ("bcryptjs");


//Para crear un controlador puedo importar de express los metodos. Así me sugiere los metodos.

const usuariosGet= (req=request, res=response)=>{
        res.json({
            msg: 'Get usuarios'
        });
 
}

const usuariosPost= async (req=request, res=response)=>{

    const {nombre, email, password, rol}= req.body;

    const usuario= new Usuario({nombre, email, password, rol});

    //Encriptar password
    const salt = bcrypt.genSaltSync()

    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save() //este metodo guarda la info.

    res.json({
        msg: 'Usuario creado',
        usuario
    });

}

const usuariosPut= async (req=request, res=response)=>{

    const id= req.params.id;
    const {_id,email,rol, password, ...resto}= req.body;

    if (password){
        const salt = bcrypt.genSaltSync();
        resto.password= bcrypt.hashSync(password, salt);
    }

    const usuario= await Usuario.findByIdAndUpdate(id, resto, {new: true}); //El new: true sirve para mostrar el nuevo usuario en postman.

    res.json({
        msg: 'Put usuarios',
        usuario,
    });

}

const usuariosDelete= async (req=request, res=response)=>{
    const {id}= req.params;
    // const usuario= await Usuario.findByIdAndDelete(id)

    //Para borrar un usuario no se elimina, se actu
    const usuario= await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        msg: 'Delete usuarios',
        usuario,
    });

}

module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}