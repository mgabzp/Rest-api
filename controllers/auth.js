const { response, request } = require("express");

const Usuario = require("../models/usuario");

const bcryptjs = require("bcryptjs");
const {generarJWT}= require ('../helpers/generar-jwt')

const login = async (req = request, res = response) => {
  //Verificar el email y pass

  const { email, password } = req.body;


  try {
    //Verificar mail
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos",
      });
    }

    // usuario está activo?

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos - estado: false",
      });
    }

    //Verificar pass

    const validPassword = bcryptjs.compareSync(password, usuario.password); //este metodo sirve para hacer una comparación.

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });
    }

    //Generar token

    const token = await generarJWT(usuario._id);

    res.json({
      msg: "Login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        msg: "Hablar con el admin",
      });
  }
};

module.exports = {
  login,
};
