const mongoose = require('mongoose');

const ethereumSchema = new mongoose.Schema({
    day:Number,
    data:[[Number]]
  
});

module.exports = mongoose.model('Ethereum', ethereumSchema);