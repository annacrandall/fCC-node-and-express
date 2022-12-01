let express = require('express');
let app = express(); 
let bodyParser = require ('body-parser'); 

app.use("/public", express.static(__dirname + "/public"));
//provides absolute path to CSS file

app.use("/", function getUserInfo (req, res, next){
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next(); 
}); 
// middleware for user information 

app.use(bodyParser.urlencoded(
  {extended: false})); 
app.use(bodyParser.json()); 
// middleware for body-parser package 

app.get("/", function getHTML (req,res){
  res.sendFile(__dirname + "/views/index.html")
}); 
// fetches index.html file 

app.get('/json', (req,res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
   res.json({
    "message":"HELLO JSON"
    })
  } else {
     res.json({
      "message":"Hello json"
    })
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);
// creates time server 

app.get("/:word/echo", (req, res) => {
  const {word} = req.params; 
  res.json({
    echo: word
  });
});
// creates echo server for API calls, gets route paramter info 

app.get("/name", (req, res) => {
  const firstName = req.query.first; 
  const lastName = req.query.last; 
  let jsonObj = {name: firstName + " "+ lastName}; 
  res.send(jsonObj); 
}); 
// API query get req. that returns JSON obj 

app.post("/name", function postName(req, res){
  const string = req.body.first + " " + req.body.last; 
  res.json({
    name : string 
  }); 
}); 
 module.exports = app;
