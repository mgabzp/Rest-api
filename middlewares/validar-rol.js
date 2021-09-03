const {request, response}= require('express');

const esAdminRole= (req=request, res=response, next)=>{

    if (!req.usuario){ //Si no viene el usuario
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token"
        })
    }

    const{rol, nombre}= req.usuario

    if(rol !== "ADMIN_ROLE"){
        return res.status(500).json({
            msg: `${nombre} no es administrador`
        })
    }

    next()

}

module.exports= {
    esAdminRole,
};