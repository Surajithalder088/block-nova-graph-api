const mongoose = require('mongoose');

const rippleSchema = new mongoose.Schema({
    day:Number,
    data:[[Number]]
  
});

module.exports = mongoose.model('Ripple', rippleSchema);