const db = require('../configs/db.config.js');//../config/db.config.js

const Libros = db.Libros;

//CREATE
exports.create = (req, res) => {
    let libro = {};

    try{
        libro.id_libro = req.body.id_libro,
        libro.titulo = req.body.titulo,
        libro.id_Autor = req.body.id_Autor,
        libro.isbn = req.body.isbn,
        libro.editorial  = req.body.editorial,
        libro.anio_publicacion = req.body.anio_publicacion,
        libro.categoria = req.body.categoria,
        libro.cantidad_Disponible = req.body.cantidad_Disponible
        libro.ubicacion = req.body.ubicacion
 
        // Save to MySQL database
        Libros.create(libro).then(result => {    
            // 
            res.status(200).json({
                message: "Save Book id = " + result.id_libro,
                libro: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

//READ
exports.retrieveAllUsuario = (req, res) => {
    // find all User information from 
    Libros.findAll()
        .then(LibrosInfos => {
            res.status(200).json({
                message: "Get all Book Infos Successfully!",
                usuarios: LibrosInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

//READ THE USER BY ID --validando
exports.getUserById = (req, res) => {
    // find all User information from 
    let LibroId = req.params.id_libro;//LibroId

    Libros.findByPk(LibroId)
        .then(Libro => {
            res.status(200).json({
                message: " Successfully Get a Book with id = " + LibroId,
                Libro: Libro
            });
        })
        . catch(error => {
          // log on console
          console.log(error);
          
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
  }

//UPDATE
exports.updateById = async (req, res) => {
    try{
        let LibroId = req.params.id_libro;//LibroId
        let Libro = await Libros.findByPk(LibroId);
    
        if(!Libro){
            // return a response to book
            res.status(404).json({
                message: "Not Found for updating a Book with id = " + LibroId,
                Libro: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                id_libro: req.body.id_libro,
                titulo: req.body.titulo,
                id_Autor: req.body.id_Autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_Disponible: req.body.cantidad_Disponible,
                ubicacion: req.body.ubicacion
            }
            let result = await Libros.update(updatedObject, {returning: true, where: {id_libro: LibroId}});
            
            // return
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Book with id = " + req.params.id_libro,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a book with id = " + LibroId,
                libro: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Book with id = " + req.params.id_libro,
            error: error.message
        });
    }
}

//DELETE
exports.deleteById = async (req, res) => {
    try{
        let LibroId = req.params.id_libro;
        let Libro = await Usuarios.findByPk(LibroId);

        if(!Libro){
            res.status(404).json({
                message: "Does Not exist a Book with id = " + LibroId,
                error: "404",
            });
        } else {
            await Libro.destroy();
            res.status(200).json({
                message: "Delete Successfully a Book with id = " + LibroId,
                Libro: Libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Book with id = " + req.params.id_libro,
            error: error.message,
        });
    }
}