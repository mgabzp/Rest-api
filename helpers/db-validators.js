const Usuario= require ('../models/usuario');

const emailExiste= async (email= "")=>{
    const existeEmail= await Usuario.findOne({email})

    if (existeEmail){
        throw new Error(`El email ${email} ya se encuentra registrado`)
    }

}

module.exports= {
    emailExiste
}