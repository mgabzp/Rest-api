const jwt = require ('jsonwebtoken');

const generarJWT =(uid)=>{

    return new Promise ((resolve, reject)=>{

        const payload = {uid} //payload es la info que quiero que me almacene el token.

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY, //la firma esta en ENV.
            {expiresIn: "4h"}, //si quiero cambiar el algoritmo tb va entre llaves.
            (err, token)=>{
                if (err){
                    reject("No se pudo generar Token")
                } else {
                    resolve (token)
                }
            }
        )
    });
};

module.exports= {
    generarJWT
}