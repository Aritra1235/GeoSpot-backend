import express from "express";

var router = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(5000, function () {
   console.log("Express App running at http://127.0.0.1:5000/");
})
