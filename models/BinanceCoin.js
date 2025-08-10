const mongoose = require('mongoose');

const bianceSchema = new mongoose.Schema({
    day:Number,
    data:[[Number]]
  
});

module.exports = mongoose.model('Biance', bianceSchema);