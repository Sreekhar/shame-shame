var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  //Just bieber video
  url = 'https://www.youtube.com/watch?v=kffacxfA7G4';

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html
  request(url, function(error, response, html){

      // First we'll check to make sure no errors occurred when making the request
      if(!error){
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
          var $ = cheerio.load(html);

          // Finally, we'll define the variables we're going to capture
          var title, release, rating;
          var json = { title : "", release : "", rating : ""};
          // We'll use the unique header class as a starting point.

          $('#comment-section-renderer-items').filter(function(){

         // Let's store the data we filter into a variable so we can easily see what's going on.

              var data = $(this);
              console.log(data.children().first().text());

         // In examining the DOM we notice that the title rests within the first child element of the header tag.
         // Utilizing jQuery we can easily navigate and get the text by writing the following code:

              title = data.children().first().text();

         // Once we have our title, we'll store it to the our json object.

              json.title = title;
          })
      } else {
          res.send('Error while requesting the URL itself')
      }
  })

})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

exports = module.exports = app;
