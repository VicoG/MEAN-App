// First add the following two lines at the top of the friends controller
// so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var Volcano = mongoose.model('Volcano');


module.exports = (function() {
	console.log('almost show');
	return {
	show: function(req, res) {
		Volcano.find({}, function (err, results) {
			console.log('console')
		if(err) {
		 console.log(err);
		} else {
		 res.json(results);
		}
		})
	},
//volcano
  	create: function(req, res) {
		console.log("POST DATA", req.body);
		var volcanos = new Volcano({img: req.body.img,
									 name: req.body.name,
									 description: req.body.description,
									 price: req.body.price,
									 features: req.body.features});
		console.log(volcanos);
		volcanos.save(function(err, friend) {
		  if(err) {
			  console.log('something went wrong');
			  console.log(err);
			  res.json({error: err});
		} else { // else console.log that we did well and then redirect to the root route
			  console.log('successfully added a user!');
			  res.json(friend);
			}
		})
	},


};
})();