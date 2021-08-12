const {Schema, model}= require ('mongoose')

const UsuarioSchema = new Schema ({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        require: [true, "El correo es obligatorio"],
        unique: true //para decir que el correo debe ser unico.
    },
    password:{
        type: String,
        require: [true, "La contraseña es obligatoria"]

    },
    img:{
        type: String
    },
    rol:{
        type: String,
        require: true,
        enum: ["USER_ROLE", "ADMIN_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

})

module.exports= model ("Usuario", UsuarioSchema)
//Primero va el nombre en mayusc, luego el esquema