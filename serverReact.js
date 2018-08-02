var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


app.get('/home', function(req, res) {

    // res.render();
    res.render('home');
});


app.listen(port, function () {
    console.log('Server is starting at port 8080');
});