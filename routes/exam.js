var db = require("../models")
    , moment = require("moment")
    , _ = require("lodash");

exports.list = function(req, res) {
    var d = new Date()
    db.Exam.findAll({
        where: ["date >= ?", moment().format("YYYY-MM-DD")],
        order: "date ASC",
        include: [db.Subject]
    }).success(function(exams) {
        _.forEach(exams, function(exam) {
            var time = moment(exam.date).lang("sk").calendar();
            var match = /.*( o \d?\d:\d?\d)/.exec(time);
            if (match === null) {
                exam.textTime = time;
            } else {
                exam.textTime = time.substr(0, time.length-match[1].length)
            }
        });
        res.render("exams", {title: "Zoznam písomiek", exams: exams, user: req.user});
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