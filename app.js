var express = require('express');
var app = express();

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('index.html');
});


let port = process.env.PORT || 5000;


app.listen(port,function(){
  console.log("server started on port 1000");
});
