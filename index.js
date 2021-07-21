var fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const path = require('path');

const port = 3033

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
console.log(poll.questions[0].question+ " " + poll.questions[0].side)

function open_index_page(req, res, next){

  if(req.method == "GET"){
    res.render('index', {
        title: poll.info.title,
        description: poll.info.description,
        instructions: poll.info.instructions,
        q1: poll.questions[0].question,
        q2: poll.questions[1].question,
        q3: poll.questions[2].question,
        q4: poll.questions[3].question,
        q5: poll.questions[4].question,
        q6: poll.questions[5].question,
        q7: poll.questions[6].question,
        q8: poll.questions[7].question,
        q9: poll.questions[8].question,
        q10: poll.questions[9].question,
        q11: poll.questions[10].question,
        q12: poll.questions[11].question,
        q13: poll.questions[12].question,
        q14: poll.questions[13].question,
        q15: poll.questions[14].question,
        q16: poll.questions[15].question,
        q17: poll.questions[16].question,
        q18: poll.questions[17].question,
        q19: poll.questions[18].question,
        q20: poll.questions[19].question,
        q21: poll.questions[20].question,
        q22: poll.questions[21].question,
        q23: poll.questions[22].question,
        q24: poll.questions[23].question,
        q25: poll.questions[24].question,
        q26: poll.questions[25].question,
        q27: poll.questions[26].question,
        q28: poll.questions[27].question,
        q29: poll.questions[28].question,
        q30: poll.questions[29].question,
        });
   }
}

app.post('/submit', function(req, res, next){
   console.log(req.body.answer)
   return res.send(req.body.answer);
   })

app.listen(port, () => {
  console.log(`1of2from30 listening on port ${port}`)
})