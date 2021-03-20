const {Schema, model, Types} = require('mongoose')

const schemaUser = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    role: {type: Number, required: true},
    budjet: {type: Number, required: true},
    links: [{ type: Types.ObjectId, ref: 'Links'}]
})
//про связку таблиц БД(DB) 28.50 (Links)

module.exports = model('User', schemaUser)