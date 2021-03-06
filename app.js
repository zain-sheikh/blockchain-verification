let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin');
let studentRouter = require('./routes/student');
let database = require('mysql');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// connection////////////
let connection = database.createConnection({
    host: "192.169.82.14",
    port: "3306",
    user: "ahmaliic_webstorm",
    password: "user_user",
    database: "ahmaliic_zain"
});

connection.connect(function (error) {
    if (error){
        console.log(error);
    }
    else{
        console.log("Connected")
    }

});

///////////////////


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/student', studentRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
