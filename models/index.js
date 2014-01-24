var fs          = require('fs')
	, path      = require('path')
	, Sequelize = require('sequelize')
	, lodash    = require('lodash')
	, db        = {};

var sequelize;

if (process.env.HEROKU_POSTGRESQL_PURPLE_URL) {
	// the application is executed on Heroku ... use the postgres database
	var match = process.env.HEROKU_POSTGRESQL_PURPLE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

	sequelize = new Sequelize(match[5], match[1], match[2], {
	  dialect:           'postgres',
	  protocol:          'postgres',
	  dialectModulePath: "pg.js",
	  port:              match[4],
	  host:              match[3],
	  logging:           true //false
	})
} else {
	sequelize = new Sequelize('simpletest', 'test', "123", {
		dialect: "postgres",
		port: 5432,
		dialectModulePath: "pg.js"
	})
}

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js')
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file))
		db[model.name] = model
	})
 
Object.keys(db).forEach(function(modelName) {
	if (db[modelName].options.hasOwnProperty('associate')) {
		db[modelName].options.associate(db)
	}
})
 
module.exports = lodash.extend({
	sequelize: sequelize,
	Sequelize: Sequelize
}, db)