const express = require('express');
const cors= require ('cors');

//Importar conexion a BD
const {dbConnection}= require('../database/config')

//Esta clase sirve para mostrar en el servidor lo que haya en el index.html de la carpeta public.

class Server{

    constructor() {
        //inicialicen cdo se levante el server
        this.app= express();
        this.usuariosPath= '/api/usuarios'; //esta ruta seria la unica que deberia cambiar si se quiere reutilizar codigo.
        this.authPath= "/api/auth";

        //Path categorias
        this.categoriasPath = "/api/categorias";

        //Path productos
        this.productosPath = "/api/productos";

        //conexion
        this.conectarDB();

        //middlewares

        this.middlewares()

        //rutas
        this.routes()

    }

    //funcion p/conectar a BD
    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //Carpeta pública
        this.app.use(express.static('public')); //todos los middlewares usan el use. En express el use es una funcion especial.

        //CORS
        this.app.use (cors())
        
        //Acceso al body leer y parsear
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true})); //esta opcion sirve para mandar parametros en postman dentro de body-x-form-urlencoded.
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios')); //aqui en realidad estoy exportando router dentro de usuarios.js, no un archivo
        this.app.use(this.categoriasPath, require ("../routes/categorias"));
        this.app.use(this.productosPath, require ("../routes/productos"));

    }


    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log('Servidor online en puerto',process.env.PORT);
        });
    }

}

module.exports=Server

//middlewares--->funciones que permiten acceder al req y al res. Lo que el usuario envia al BE y lo que el BE le responde.