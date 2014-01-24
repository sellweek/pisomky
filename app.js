
/**
 * Module dependencies.
 */

var express = require('express')
  , subject = require('./routes/subject')
  , exam = require("./routes/exam")
  , http = require('http')
  , path = require('path')
  , db = require("./models")
  , error = require("./error.js").error
  , passport = require("passport")
  , BasicStrategy = require("passport-http").BasicStrategy;

passport.use(new BasicStrategy(function(username, password, done) {
  if (username == "gpm110" && password == "110") {
    return done(null, true);
  } else {
    return done(null, false);
  }
}));

passport.serializeUser(function(user, done) {
  if (user)
    done(null, "true");
});

passport.deserializeUser(function(user, done) {
  if (user = "true")
    done(null, true)
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: "YYBKCwdeWu"}))
app.use(passport.initialize());
app.use(passport.session());
app.use(error("error"));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/subject', passport.authenticate('basic', {session: true}), subject.list);
app.post("/subject", passport.authenticate('basic', {session: true}), subject.submit);
app.delete("/subject/:id", passport.authenticate('basic', {session: true}), subject.delete)
app.get('/', exam.list);
app.get('/exam', exam.list);
app.post("/exam", passport.authenticate('basic', {session: true}), exam.submit);
app.get("/exam/new", passport.authenticate('basic', {session: true}), exam.add);
app.delete("/exam/:id", passport.authenticate('basic', {session: true}), exam.delete)

db
  .sequelize
  .sync({ force: false })
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })