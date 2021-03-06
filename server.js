const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let now = new Date().toString();

  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) { console.log('Unable to append to server.log')}
  })
  next();
})

// Maintenace Pages
// app.use((req, res, next) => {
//   res.render('maintenance', {
//     pageTitle: 'Down for Maintenace'
//   });
// })

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Today was a good day',
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Averys Projects',
    projectList: '--Node Webserver'
  });
});

// /bad - send back json with erromMessage
app.get('/bad', (req,res) => {
  res.send({
    erromMessage: 'Na'
  })
});

// Bind port to app
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
