const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const quote = require('quotesy');
const sgmail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
require('dotenv').config();

const viewsPath = path.join(__dirname, 'templates/views');
const partialsPath = path.join(__dirname, 'templates/partials');
const publicPath = path.join(__dirname, 'public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.set('port', port);
hbs.registerPartials(partialsPath);

sgmail.setApiKey(
  process.env.SG_API_KEY
);

///////////////////////////////////
app.get('', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('home');
});

getQuote = () => {
  var newQuote = quote.random();
  
  if (newQuote == 'Donald Trump') {
    newQuote = quote.random();
  }
  
  return newQuote;
};

app.get('/getQuote', (req, res) => {
  res.send(getQuote());
});

app.post('/contactMe', (req, res) => {
  const msg = {
    to: 'zacharydeagle@gmail.com',
    from: 'zachdeagleinquiries@protonmail.com',
    subject: 'portfolio inquiry',
    text: `from ${req.body.name} at ${req.body.email} saying: ${req.body.body}`,
  };

  res.send(
    sgmail.send(msg)
      .then(() => {
        console.log('email sent!');
      })
      .catch((error) => {
        console.error(error);
      })
  );

});
/////////////////////////////////////////

///////////////////////////////////////
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
