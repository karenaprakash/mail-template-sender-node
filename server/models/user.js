/**
 *  user model
 */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name : {
        type: String,
        required : true
    },
    last_name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    mobile : {
        type: Number,
        required : true
    },
    designation : {
        type: String,
        default : 'n/a'
    },
    age : {
        type: Number,
        required : true
    },
    description : {
        type: String,
        default : 'n/a'
    }
},{timestamps:true})


const User = mongoose.model('User',userSchema)

module.exports = { User }