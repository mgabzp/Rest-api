const {Schema, model}= require ('mongoose')

const UsuarioSchema = new Schema ({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true //para decir que el correo debe ser unico.
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]

    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
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

});

//Para manejo de lo que verá el front. Para que no vean contraseñas etc.

UsuarioSchema.methods.toJSON= function(){

const {password, __v, _id, ...usuario}=this.toObject();

usuario.uid= _id;

return usuario;

}

module.exports= model ("Usuario", UsuarioSchema)
//Primero va el nombre en mayusc, luego el esquema