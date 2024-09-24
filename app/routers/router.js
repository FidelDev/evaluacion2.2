let express = require('express');
let router = express.Router();
 
const Libro = require('../controllers/libro.controllers.js');//../controllers/Usuarios.controller.js
//controllers.js
router.post('/api/Libro/create', Libro.create);
router.get('/api/Libro/all', Libro.retrieveAllUsuario);
router.get('/api/Libro/onebyid/:id_libro', Libro.getUserById);
router.put('/api/Libro/update/:id_libro', Libro.updateById);
router.delete('/api/Libro/delete/:id_libro', Libro.deleteById);


module.exports = router;