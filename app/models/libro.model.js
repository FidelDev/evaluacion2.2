
module.exports = (sequelize, Sequelize) => {
	const Libros = sequelize.define('libros', {	
	  id_libro: {
			type: Sequelize.INTEGER,
			primaryKey: true,
    },
	  titulo: {
			type: Sequelize.STRING
	  },
	  id_Autor: {
			type: Sequelize.STRING
  	},
	  isbn: {
			type: Sequelize.STRING
	  },
    editorial: {
        type: Sequelize.STRING
      },
      anio_publicacion: {
        type: Sequelize.DATEONLY,
      },
    categoria: {
        type: Sequelize.STRING,
      },
      cantidad_Disponible: {
        type: Sequelize.STRING,
      },
      ubicacion: {
        type: Sequelize.STRING,
      }
	});
	
	return Libros;
}

/*
id_libro
titulo
id_Autor
isbn
editorial
anio_publicacion
categoria
cantidad_Disponible
ubicacion
*/
