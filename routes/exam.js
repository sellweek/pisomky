var db = require("../models")
	, moment = require("moment");

exports.list = function(req, res) {
    var d = new Date()
	db.Exam.findAll({
		where: ["date >= ?", moment().format("YYYY-MM-DD")],
		order: "date ASC",
		include: [db.Subject]
	}).success(function(exams) {
        res.render("exams", {title: "Zoznam písomiek", exams: exams});
    }).error(res.error);
}

exports.add = function(req, res) {
	db.Subject.findAll({attributes: ["id", "name"]}).success(function(subjects){
		res.render("add-exam", {title: "Pridať písomku", subjects: subjects});
	}).error(res.error);
}

exports.submit = function(req, res) {
	console.log("Telo predmetu:" + JSON.stringify(req.body));
	db.Exam.create(req.body).success(function () {
		res.redirect("/");
	}).error(res.error);
}

exports.delete = function(req, res) {
	db.Exam.destroy({id: req.params.id}).success(function() {
		res.redirect("/exam");
	}).error(res.error);
}