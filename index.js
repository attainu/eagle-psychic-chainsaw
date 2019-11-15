 
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use('/public', express.static('public'));
const hbs = exphbs.create({
    extname: '.hbs'
    }
)
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');



//Home Route
app.get('/', function (req, res) {
     res.render('product_display',{
     	title:"product_display"
     });
});



//Port
app.listen(PORT, function () {
    console.log("Started : ", PORT);
}).on('error', function () {
    console.log("Unable To Start App >>>");

}) 