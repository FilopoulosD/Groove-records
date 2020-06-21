if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({ path: '.env' });

}
///dsasaa
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/artists')
const albumRouter = require('./routes/albums')


app.set('view engine','ejs')
//app.set('views',__dirname + '/views')

app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/users', express.static('public'))
app.use('/artists', express.static('public'))
app.use('/artists/:nameee', express.static('public'))

app.use('/albums', express.static('public'))

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))




app.use(express.urlencoded({extended:true }))

// Passport Config
require('./config/passport')(passport);


// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );


  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true  }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use('/',indexRouter)

app.use('/users',require('./routes/users'));
app.use('/artists', authorRouter);
app.use('/albums',albumRouter);





app.listen(process.env.PORT || 3000) ;

app.use(express.static(__dirname + '/views/layouts')); //add css
