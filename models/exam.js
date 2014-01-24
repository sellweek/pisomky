module.exports = function(sequelize, DataTypes) {
	var Exam = sequelize.define("Exam", {
		topic: DataTypes.STRING,
		date: DataTypes.DATE,
		group: DataTypes.INTEGER
	}, {
		associate: function(models) {
			Exam.belongsTo(models.Subject);
		}
	});
	return Exam;
}