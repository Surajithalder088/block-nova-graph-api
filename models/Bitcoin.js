const mongoose = require('mongoose');

const bitcoinSchema = new mongoose.Schema({
    day:Number,
    data:[[Number]]
  
});

module.exports = mongoose.model('Bitcoin', bitcoinSchema);