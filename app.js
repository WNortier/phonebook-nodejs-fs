//@ts-nocheck
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const app = express();

app.engine(
  'hbs',
  expressHandlebars({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs',
  })
);

app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const contactRoutes = require('./routes/contacts');

app.use('/', contactRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

const port = 5010;
app.listen(port);
console.log(`App listening on port ${port}`);
