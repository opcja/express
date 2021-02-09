const express = require('express');
const router = express.Router();
const login = 'admin';
const password = '123';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Logowanie' });
});

router.post('/login', (req, res) => { // dane z formularza beda w req.body
  const body = req.body;

  if(body.login === login && body.password === password) {
    req.session.admin = 1; // admin to nazwa sesji
    res.redirect('/admin')
  } else {
    res.redirect('/login')
  }

  
})

module.exports = router;
