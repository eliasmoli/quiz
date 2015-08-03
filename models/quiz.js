// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',
			{ pregunta: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falta Pregunta"}}
			},
			respuesta: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falta Respuesta"}}
	  		},
	  		tema:{
				type: DataTypes.STRING,
				// Valida si la categoría está en las previstas
				// http://stackoverflow.com/questions/12623272/how-to-check-if-a-string-array-contains-one-string-in-javascript
				// http://docs.sequelizejs.com/en/latest/api/datatypes/
                validate: { 
                	//fn: function(val) {
                	//	if (val !== "mustbethis") throw new Error("Custom validation failed");
                	//}
                	contains: function (val) {
          				if (['otro','humanidades','ocio','tecnología','ciencia']
                		.indexOf(val) < 0) {
                			// console.log("Categoría desconocida: " + val);
            				msg: "-> Temática incorrecta"
         				}}
                		//notEmpty: {msg: "-> Falta Categoría"
            }}}
        );
}
