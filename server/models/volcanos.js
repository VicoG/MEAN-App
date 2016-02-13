
var mongoose = require('mongoose');

var VolcanoSchema = new mongoose.Schema({
  img: String,
  name: String,
  description: String,
  price: String,
  features: String
});

mongoose.model('Volcano', VolcanoSchema);

