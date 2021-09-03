const { response } = require("express");
const Producto = require("../models/producto");

//obtener Productos- paginado- total- populate

const obtenerProductos = async (req, res = response) => {
  let { limite = 5, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);

  if (isNaN(limite)) {
    limite = 5;
  }
  if (isNaN(desde)) {
    desde = 0;
  }

  //Hacer varias promesas a la vez.

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }), //realiza conteo total.
    Producto.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre email") //este metodo sirve para conectar con  la propiedad "usuario" del modelo de producto y el id generado por mongoose. Luego trae los datos del id que quiero que me muestre.
      .populate("categoria", "nombre"),
  ]);

  res.json({
    Total: total,
    productos,
  });
};

//Obtener producto - populate {}
const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre email")
    .populate("categoria", "nombre");

  res.json({
    producto,
  });
};

//Crear producto
const crearProductos = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body; //esto sirve para que no puedan modificar el estado ni el usuario, el resto del body si tomará los cambios (x ej nombre, precio, categoria). Si alguien manda estado: false, no se guardará ya que está protegido y por defecto el estado es true (modelo de prod).

  const productoDB = await Producto.findOne({
    nombre: body.nombre.toUpperCase(), //Para guardar los productos en mayusc.
  });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }

  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const producto = new Producto(data); //Se crea el nuevo producto en esta instancia con la clase.

  //Guardar DB

  await producto.save();

  res.status(201).json(producto);
};

//Actualizar categoria--------------------------------
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { _id, estado, usuario, ...resto } = req.body;

  if (resto.nombre) {
    resto.nombre = resto.nombre.toUpperCase();
  }
  resto.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    msg: "Producto actualizado",
    producto,
  });
};

//Borrar Categoria
const borrarProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: "Producto eliminado",
    producto,
  });
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProductos,
  actualizarProducto,
  borrarProducto,
};