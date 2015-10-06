var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.use(function(req,res,next) {
  console.log('REDDIT REQUEST');
  next();
});

router.get('/', function(req, res) {
  var url = 'https://www.reddit.com/r/FoodPorn/' + req.url;
  request(url, function(error, response, html) {
    if(!error && response.statusCode === 200) {
      var $ = cheerio.load(html);

      /* remove header */
      $('#header').remove();
      /* remove floating bar */
      $('h3').remove();
      /* remove sidebar */
      $('.side').remove();
      /* remove footer */
      $('.footer-parent').remove();
      /* remove url after titles */
      $('.domain').remove();
      /* remove up/down arrows */
      $('.midcol').remove();
      /* remove the rank */
      $('.rank').remove();
      //$('.title a').attr('style', 'font-size: 12px !important;');

      /* change next/prev buttons to reroute to our app */
      $('.nextprev a').each(function(index, object) {
        var link = object.attribs.href;
        object.attribs.href = link.substring(link.indexOf('?'));
      });
      res.send($.html());
    }
  });
});

module.exports = router;
