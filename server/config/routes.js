var volcanos = require('./../controllers/volcanos.js');
var students = require('./../controllers/customerController.js');
var orders = require('./../controllers/customerController.js');



module.exports = function(app) {
    app.get('/data', function (req, res) {
    	console.log('model');
    	volcanos.show(req, res);
    });
    //volcano
	app.post('/add', function(req,res){
		console.log('help');
		volcanos.create(req, res)
	});
	app.get('/friends', function(req, res) {
		students.show(req, res);
	});
	app.post('/add', function(req,res){
		console.log('help');
		students.create(req, res)
	})
	app.post('/remove', function (req, res){
		console.log('at routes');
		students.remove(req, res);
	})
	app.get('/orders', function (req, res){
		students.showOrders (req, res)
	})
	app.post('/addOrder', function (req, res){
		console.log('routes');
		students.placeOrder(req, res)
	})
	app.post('/removeOrder', function (req, res){
		console.log('at routes RO');
		orders.removeOrder(req, res);
	})
};



