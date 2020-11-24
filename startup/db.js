const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/Basic-API',{ useUnifiedTopology: true , useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb'))
}