//Importamos una libreria en Node de esta manera, como una constante. Se crea variable app para funcionalidades de express.

// const express = require('express');
require('dotenv').config() //para usar las variables de entorno 

const Server= require ('./models/server')

const server= new Server ()

server.listen();

// const app = express()

//Req es la peticion y res de response. 
 

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })


 
// app.listen(process.env.PORT, ()=>{
//     console.log('Servidor online en puerto',process.env.PORT);
// }); 

//Aqui escucha al puerto, el 3000 ya esta para frontend. Recibe 2 parametros, el puerto y el callback. Lo que se reciba como mensaje se verá en la terminal del SERVIDOR, no en el navegador.

//Dsd la terminal puedo llamar al servidor: node app.js y me da la respuesta.