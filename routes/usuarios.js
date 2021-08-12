//Rutas de usuarios

const {Router}= require ('express'); //importo el metodo router de express y abajo se lo asigno a una variable.

const router= Router();

const {check}= require ('express-validator');

//Controladores
const {validarCampos}= require ('../middlewares/validar-campos');

const {emailExiste}= require ('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require ('../controllers/usuarios')

//Para traer info

router.get('/', usuariosGet);

//Para mandar info
//el check es un método al que se le puede asignar otros métodos.

router.post('/', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "Debe tener una contraseña").not().isEmpty().trim(),
    check("password", "La contraseña debe tener 5 caracteres como mínimo").isLength({
        min:6,
    }),
    check("email", "No es un correo válido").isEmail(),
    check ("email").custom(emailExiste),
    check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos
], 
usuariosPost
);

//Para actualizar info, se pone en la barra : y el parametro, x ej :id

router.put('/:id', 
[check("id", "No es un id válido").isMongoId(), validarCampos],
usuariosPut);

//Para eliminar info

router.delete('/:id', usuariosDelete);

module.exports= router