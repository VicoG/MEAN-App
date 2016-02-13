var mongoose = require('mongoose');
// create our friendSchema
var CustomerSchema = new mongoose.Schema({
  name: String,
  date: Date
});

var OrderSchema = new mongoose.Schema({
	name: String,
	product: String,
	quantity: Number,
	date: Date
});

mongoose.model('Customer', CustomerSchema);
mongoose.model("Order", OrderSchema);