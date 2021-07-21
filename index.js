var fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const path = require('path');
var session = require('express-session')
var CryptoJS = require("crypto-js");

const port = 3033

let str = "ANS-";
let stra = "a";
let strb = "b";

app.use(session({
  secret: 'user',
  questionnum: 0,
  sideA: 0,
  sideB: 0,
  uuid: null,
  str: null,
}))

app.use(express.static('public'));

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "public"));
app.set("view engine", "ejs");

app.get('/', open_index_page);//call for main index page

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
         str = str.concat(stra);
      }
      else {
         str = str.concat(strb);
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
uuid = uuidv4()
console.log(`Poll complete: ID-${uuid}-${str}`)
var ciphertext = CryptoJS.AES.encrypt(`ID-${uuid}-${str}`, poll.info.key).toString();
    res.render('result', {
        title: poll.info.title,
        description: poll.info.description,
        result: side,
        encodedInfo: ciphertext,
        uuid: uuid,
         });
      }});

   app.post('/no', function(req, res, next){
      if (poll.questions[questionnum].side === "b") {
         sideB++;
         str = str.concat(strb);
      }
      else {
         str = str.concat(stra);
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
uuid = uuidv4()
console.log(`Poll complete: ID-${uuid}-${str}`)
var ciphertext = CryptoJS.AES.encrypt(`ID-${uuid}-${str}`, poll.info.key).toString();
      res.render('result', {
         title: poll.info.title,
         description: poll.info.description,
         result: side,
         encodedInfo: ciphertext,
         uuid: uuid,
      });
   }});
}
// End of open_index_page function

// WIP Decryption
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

app.listen(port, () => {
  console.log(`1of2from30 listening on port ${port}`)
})