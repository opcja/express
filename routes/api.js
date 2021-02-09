const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort = -1;

/* GET home page. */
router.get('/', (req, res, next) => {
  const search = req.query.search || ''; // query to parm w URL, search to jego nazwa
  let sort = req.query.sort || defaultSort;

  if(sort !== -1 || sort !== 1) {
    sort = defaultSort;
  }

  const findNews = News
    .find({title: new RegExp(search.trim(), 'i')}) // nie bierze pod uwage wielkosci liter i szuka "po części" trim usuwa spacje przód
    .sort({created: sort}) // rosnąco by było 1

  findNews.exec((err, data) => {
    res.json(data);
  });  
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    const findNews = News
    .findById(id)

  findNews.exec((err, data) => {
    res.json(data);
  });  
});

module.exports = router;
