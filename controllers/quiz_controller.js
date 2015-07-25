var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
	// Se utiliza done(), porque success() está deprecated
	// O usar then
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	})
};

exports.show = function(req, res) {
   // con find() no funciona
   models.Quiz.findById(req.params.quizId).then(function(quiz) {
      res.render('quizes/show', { quiz: quiz});
   })
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	// con find() no funciona
   	models.Quiz.findById(req.params.quizId).then(function(quiz){
   		if (req.query.respuesta === quiz.respuesta){
   			res.render('quizes/answer',
   				{ quiz: quiz, respuesta: 'Correcto'});
   		} else {
      		res.render('quizes/answer',
      			{ quiz: quiz, respuesta: 'Incorrecto'});
   		}
   	})
};

// GET /author
exports.author = function(req, res) {
   res.render('author', {author: 'Elías'});
};