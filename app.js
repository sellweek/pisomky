
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , subject = require('./routes/subject')
  , http = require('http')
  , path = require('path')
  , db = require("./models")
  , error = require("./error.js").error;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(error("error"))
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/subject', subject.list);
app.post("/subject", subject.add);
app.delete("/subject/:id", subject.delete)

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