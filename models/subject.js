module.exports = function(sequelize, DataTypes) {
	var Subject = sequelize.define("Subject", {
		name: DataTypes.STRING,
		abbreviation: DataTypes.STRING
	}, {
		associate: function(models) {
			Subject.hasMany(models.Exam)
		}
	});

	return Subject;
}