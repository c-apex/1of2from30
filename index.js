var fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const path = require('path');
var session = require('express-session')

const port = 3033

app.use(session({
  secret: 'user',
  questionnum: 0,
  sideA: 0,
  sideB: 0
}))

app.use(express.static('public'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "public"));
app.set("view engine", "ejs");

app.get('/', open_index_page);//call for main index page

/* document.getElementById("questions").innerHTML =
app.get('/q1', function (req, res) {
  res.send(poll.questions[0].question)
})
*/

function open_index_page(req, res, next) {
   var poll = null;

   if(req.method == "GET"){
      res.render('index')
   }

   app.post('/pollselect', function(req, res) {
      var pollid = req.body.pollid;
      poll = require(`./public/polls/${pollid}.json`);
      var text = JSON.parse(JSON.stringify(poll));
      questionnum = 0;
      sideA = 0,
      sideB = 0
      res.render('poll', {
         title: poll.info.title,
         description: poll.info.description,
         instructions: poll.info.instructions,
         question: poll.questions[0].question,
   })});


   app.post('/yes', function(req, res, next){
      if (poll.questions[questionnum].side === "a") {
         sideA++;
      }
      let numcompare = questionnum < 29
      if (numcompare === true) {
         questionnum++;
         res.render('poll', {
            title: poll.info.title,
            description: poll.info.description,
            instructions: poll.info.instructions,
            question: poll.questions[questionnum].question,
         });
      } else {
         if (sideA > sideB) {
            var side = poll.info.sideAResult
         }
         else if (sideA === sideB) {
            var side = poll.info.neutralResult
         }
         else if (sideA < sideB) {
            var side = poll.info.sideBResult
         }
         res.render('result', {
            title: poll.info.title,
            description: poll.info.description,
            result: side,
            encodedInfo: "WIP",
         });
      }});

   app.post('/no', function(req, res, next){
      if (poll.questions[questionnum].side === "b") {
         sideB++;
      }
   let numcompare = questionnum < 29
   if (numcompare === true) {
      questionnum = questionnum + 1;
      res.render('poll', {
         title: poll.info.title,
         description: poll.info.description,
         instructions: poll.info.instructions,
         question: poll.questions[questionnum].question,
      });
   }
   else {
      if (sideA > sideB) {
         var side = poll.info.sideAResult
      }
      else if (sideA === sideB) {
         var side = poll.info.neutralResult
      }
      else if (sideA < sideB) {
         var side = poll.info.sideBResult
      }
      res.render('result', {
         title: poll.info.title,
         description: poll.info.description,
         result: side,
         encodedInfo: "WIP",
      });
   }});
}
// End of open_index_page function

app.listen(port, () => {
  console.log(`1of2from30 listening on port ${port}`)
})