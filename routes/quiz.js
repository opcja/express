const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', (req, res, next) => {
  const show = !req.session.vote;

  Quiz.find({}, (err, data) => { // data beda wszystkie pytania z bazy
    let sum = 0;

    data.forEach((item) => {
      sum += item.vote; // zaliczanie wszystkiech glowów
    });

    res.render('quiz', { title: 'Quiz', data, show, sum }); 
  });  
});

router.post('/', (req, res, next) => {
  const id = req.body.quiz;
  Quiz.findOne({_id: id}, (err, data) => { 
    
    data.vote = data.vote + 1;
    data.save((err) => {
      req.session.vote = 1; // sesja zeby nie glosować wiecej
      res.redirect('/quiz');
    });
  });  
});


module.exports = router;
