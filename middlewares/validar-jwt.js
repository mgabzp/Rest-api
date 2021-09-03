//Esta validacion seria un middleware

const {request, response}= require('express');
const jwt= require ('jsonwebtoken');
const Usuario= require('../models/usuario');

const validarJWT= async (req= request, res=response, next)=>{

    const token= req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: "No hay token en la petición"
        })
    }

    try {

        const {uid}= jwt.verify(token, process.env.SECRETORPRIVATEKEY) //metodo que permite verificar que el token sea valido.
        
//Leer el usuario

const usuario= await Usuario.findById(uid)

//Verificar si usuario existe

if (!usuario){
    return res.status(401).json({
        msg: "Token no válido - Usuario no existe"
    })
}

//Verificar si uid es de un usuario activo

if (!usuario.estado){
    return res.status(401).json({
        msg: "Token no válido - Usuario inactivo"
    })
}

req.usuario=usuario;

next ();

    } catch (error) {
        res.status(401).json({
            msg: "Token no válido",
        })
    }

}

module.exports={
    validarJWT
}