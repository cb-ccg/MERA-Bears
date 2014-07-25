
/**
 * Module dependencies.
 */
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/bears'); // connect to our database

var Bear     = require('../models/bears');

var restpress = require('restpress');

// Create a RESTful resource
var resource = new restpress('bears', require('./bears-actions.json'));

resource.all(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

// list bears service endpoint
resource.list(function(req, res) {
  res.json({"action": "list", "data": "list data from stub"});
});

// read bears service endpoint
resource.read(function(req, res) {
  res.json({"action": "read", "data": "read data from stub"});
});

// create a bear
resource.create(function(req, res) {
	var bear = new Bear(); 		// create a new instance of the Bear model
	bear.name = req.body.name;  // set the bears name (comes from the request)

	// save the bear and check for errors
	bear.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Bear created!' });
	});
});

// update bears service endpoint
resource.update(function(req, res) {
  res.json({"action": "update", "data": "update data from stub"});
});

// delete bears service endpoint
resource.delete(function(req, res) {
  res.json({"action": "delete", "data": "delete data from stub"});
});

module.exports = resource;
