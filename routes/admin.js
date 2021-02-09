const express = require('express');
const News = require('../models/news') // modele są z wielkiej
const router = express.Router();


router.all('*', (req, res, next) => { // każde req dla /admin będzie to zawierać ?
  if(!req.session.admin) { // weryfikacja istnienia sesji
    res.redirect('login');
    return;
  }  
  
  next();
});

/* GET home page. */
router.get('/', (req, res) => {
  News.find({}, (err, data) => { // pobierze wszystkie artykuły
    //console.log(data.slice(data.length - 3));
    res.render('admin/index', { title: 'Admin', data });
  }); 
  
});

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Dodaj news', body: {}, errors: {} });
});

router.post('/news/add', (req, res) => {
  const body = req.body;

  const newsData = new News(body);  
  const errors = newsData.validateSync();  // sprawdzenie czy oba inputy sa wypełnione

  newsData.save((err) => {
    if(err) { // jezeli któreś pole jest puste to renderujemy znów formularz
      res.render('admin/news-form', { title: 'Dodaj news', errors, body });
      return;
    }     

    res.redirect('/admin');
  });  
});

router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id, (err) => {
    res.redirect('/admin');
  });
});

module.exports = router;