const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      password: {
        type: String
      }      
    }, { timestamps: true });

mongoose.models = {}

module.exports = mongoose.model('User', userSchema)