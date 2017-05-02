const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// MIDDLEWARE BUILT IN
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to this awesome Node website, powered by Express'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad failed request - send back JSON with errorMessage property "Unable to fulfil this request"
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfil this request'
  });
})

app.listen(3000, () => {
  console.log('Server has started on port 3000');
});
