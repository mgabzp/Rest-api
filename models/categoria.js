const {Schema, model, models}= require ('mongoose')

const CategoriaSchema = new Schema ({

    nombre:{
        type: String,
        required:[true, "El nombre es obligatorio"],
        unique: true

    },

    estado:{
        type: Boolean,
        default: true,
        required: true
    },

    usuario:{
        type: Schema.Types.ObjectId, //esto sirve para guardar el id del usuario como objeto de moongose.
        ref: "Usuario",
        required: true
    },

});

//Para que el front no vea el estado y el __v(version que guarda la base de datos en cda registro).

CategoriaSchema.methods.toJSON= function (){
    const {__v, estado, ...data}= this.toObject()

    return data
}

module.exports= model("Categoria", CategoriaSchema);