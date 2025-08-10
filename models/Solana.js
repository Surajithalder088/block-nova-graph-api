const mongoose = require('mongoose');

const solanaSchema = new mongoose.Schema({
    day:Number,
    data:[[Number]]
  
});

module.exports = mongoose.model('Solana', solanaSchema);