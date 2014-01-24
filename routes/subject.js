var db = require("../models")

exports.list = function(req, res) {
	db.Subject.findAll().success(function(subjects) {
		res.render("subjects", {title: "Zoznam predmetov", subjects: subjects});
	}).error(res.error);
}

exports.add = function(req, res) {
	db.Subject.create(req.body).success(function() {
		res.redirect("/subject");
	}).error(res.error);
}

exports.delete = function(req, res) {
	db.Subject.destroy({id: req.params.id}).success(function() {
		res.redirect("/subject");
	}).error(res.error);
}