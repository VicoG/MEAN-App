var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');

module.exports = (function() {
	return {
	show: function(req, res) {
	 Customer.find({}, function (err, results) {
	   if(err) {
	     console.log(err);
	   } else {
	     res.json(results);
	   }
	})
	},
	showOrders: function (req, res){
		Order.find({}, function (err, results){
			if(err){
				console.log(err);
			} else{
				res.json(results);
			}
		})
	},
	placeOrder: function (req, res){
		var order = new Order({name: req.body.name, product: req.body.product, quantity: req.body.quantity, date: new Date()});
		console.log(order);
		order.save(function (err, thing){
			if(err){
				res.json({error:err});
			}else{
				res.json(thing);
			}
		})
	},
  	create: function(req, res) {
		console.log("POST DATA", req.body);
		var students = new Customer({name: req.body.name, date: new Date()});
		console.log(students);
		students.save(function(err, friend) {
		  if(err) {
			  console.log('something went wrong');
			  console.log(err);
			  res.json({error: err});
		} else { // else console.log that we did well and then redirect to the root route
			  console.log('successfully added a user!');
			  res.redirect('/friends');
			}
		})
	},
	remove: function(req, res){
		Customer.remove({ _id: req.body._id}, function (err, data){
			if(err){
				res.json({error: err});
			}	else{
				res.json(data);
			}
		})
	},
	removeOrder: function(req, res){
		console.log('script remove');
		Order.remove({ _id: req.body._id}, function (err, data){
			if(err){
				res.json({error: err});
			}	else{
				console.log('successfully removed an order!');
				res.json(data);
			}
		})
	}
 }
})();