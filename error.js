exports.error = function(errView) {
	return function(req, res, next) {
		res.error = function(error){
			res.status(500).render(errView, {title: "Chyba!", error: error})
		}

		next();
	}
}