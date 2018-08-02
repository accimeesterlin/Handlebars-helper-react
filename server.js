var express = require('express');
var mysql = require('mysql');
var expressHandlebars = require('express-handlebars');
var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root1',
    password: '',
    database: 'top_songsDB'
});

// connection.connect();

// Querys

// connection.end();
app.use(express.static('public'));

var hbs = expressHandlebars.create({
    helpers: {
        updated: function(a, b, c) {
            if (a > b) {
                return c.fn(this)
            }
        },

        list: function(items, options) {
            var out = "<ul>";

            for(var i=0, l=items.length; i<l; i++) {
              out = out + "<li>" + options.fn(items[i]) + "</li>";
            }
          
            return out + "</ul>";
        }
    },
    defaultLayout: 'main'
});



var port = process.env.PORT || 8080;

// views   
// layouts
// main.handlebars


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


/*
    Jade
    EJS
    Handlebars

    React



    for Loop
    Conditional Logic = If Statement
    Render Object 

    Helper

    each
    if
    unless
    permalink

    partials
*/





app.get('/', function (req, res) {

    var query = 'SELECT * from Top5000';
    connection.query(query, function (error, results, fields) {
        if (error) {
            res.render('error');
        } else {
            res.render('dashboard', { songs: results });
        }
    });

    

}); 

app.get('/about', function (req, res) {
    res.render('index', {
        title: 'About'
    });
});

app.listen(port, function () {
    console.log('Server is starting at port 8080');
});