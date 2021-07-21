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

var poll = require('./public/polls/test.json');
var text = JSON.parse(JSON.stringify(poll));
/* document.getElementById("questions").innerHTML =
app.get('/q1', function (req, res) {
  res.send(poll.questions[0].question)
})
*/
function open_index_page(req, res, next){

  if(req.method == "GET"){
  questionnum = 0;
  sideA = 0,
  sideB = 0
    res.render('index', {
        title: poll.info.title,
        description: poll.info.description,
        instructions: poll.info.instructions,
        question: poll.questions[0].question,
        });
   }
}

app.post('/yes', function(req, res, next){
if (poll.questions[questionnum].side === "a") {
sideA = sideA + 1;
}
let numcompare = questionnum < 29
if (numcompare === true) {
questionnum = questionnum + 1;
    res.render('index', {
        title: poll.info.title,
        description: poll.info.description,
        instructions: poll.info.instructions,
        question: poll.questions[questionnum].question,
        });
   }
   else console.log(result)
   })

app.post('/no', function(req, res, next){
if (poll.questions[questionnum].side === "b") {
sideB = sideB + 1;
}
let numcompare = questionnum < 29
if (numcompare === true) {
questionnum = questionnum + 1;
    res.render('index', {
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
           }})

app.listen(port, () => {
  console.log(`1of2from30 listening on port ${port}`)
})