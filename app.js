var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDB = require('./config/db');
var bodyParser = require('body-parser');
const cors = require('cors')
let PORT = process.env.PORT || 5000;

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var addRouter = require('./routes/posts');

var app = express();
app.use(cors())

//kết nối csdl
connectDB()

var MongoClient = require('mongodb').MongoClient;
// Connect to the db 
MongoClient.connect("mongodb://als:abc1230-=@123.30.149.95:27017/?directConnection=true", { useUnifiedTopology: true, useNewUrlParser: true }, function(err, db) { 
if(!err) { 
   console.log("You are connected!"); 
   var dbo = db.db("als");
   var myobj = { name: "Company Inc", address: "Highway 37" };
   dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
   };
      // db.close(); 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/', addRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log("5000");
})

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
