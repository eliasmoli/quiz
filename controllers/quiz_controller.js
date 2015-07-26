var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
   // Con find no funciona
   models.Quiz.findById(quizId).then(
      function(quiz) {
         if (quiz) {
            req.quiz = quiz;
            next();
         } else { next(new Error('No existe quizId=' + quizId)); }
      }
      ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
	// Se utiliza done(), porque success() está deprecated
	// O usar then
   // req.query.search != undefined || req.query.search != null
   if (req.query.search) {
      var filtro  = "%" + req.query.search + "%";
      //.replace(" ", "%");
      filtro = filtro.replace(/\s/g, "%");
      //(req.query.search || '')
      //the ASC keyword orders by the specified columns alphabetically.
      // P.e. Si se busca "de gal" en el formulario, se ejecuta:
      // SELECT `id`, `pregunta`, `respuesta`, `createdAt`, `updatedAt` FROM `Quizzes` AS `Quiz` WHERE pregunta like '%de%gal%' ORDER BY pregunta ASC;
      models.Quiz.findAll({where: ["pregunta like ?", filtro ],order:'pregunta ASC'}).then(function(quizes){
         res.render('quizes/index.ejs', {quizes: quizes});
   }).catch(function(error) { next(error);})
   } else {
      models.Quiz.findAll().then(function(quizes) {
         res.render('quizes/index.ejs', { quizes: quizes});
      }).catch(function(error) { next(error);})
   };
}

exports.show = function(req, res) {
   res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
   var resultado = 'Incorrecto';
   if (req.query.respuesta === req.quiz.respuesta) {
      resultado = 'Correcto';
   }
   res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

// GET /author
exports.author = function(req, res) {
   res.render('author', {author: 'Elías'});
};