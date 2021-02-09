const express = require('express');
const router = express.Router();
const News = require('../models/news');

/* GET home page. */
router.get('/', (req, res, next) => {
  const search = req.query.search || '';

  const findNews = News
    .find({title: new RegExp(search.trim(), 'i')}) // nie bierze pod uwage wielkosci liter i szuka "po części" trim usuwa spacje przód
    .sort({created: -1}) // rosnąco by było 1

  findNews.exec((err, data) => {
    res.render('news', { title: 'News', data, search });
  });  
});

module.exports = router;
