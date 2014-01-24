var db = require("../models")

exports.list = function(req, res) {
	db.Subject.findAll().success(function(subjects) {
		res.render("subjects", {title: "Zoznam predmetov", subjects: subjects, authenticated: req.user});
	}).error(res.error);
}

exports.submit = function(req, res) {
	if (req.body.name === "" || req.body.abbreviation === "") {
		res.error("Chýba názov alebo skratka predmetu!")
	}
	db.Subject.create(req.body).success(function() {
		res.redirect("/subject");
	}).error(res.error);
}

exports.delete = function(req, res) {
	db.Subject.destroy({id: req.params.id}).success(function() {
		res.redirect("/subject");
	}).error(res.error);
}