const {Schema, model, Types} = require('mongoose')

const schemaGoods = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    count: {type: Number, required: true},
    links: [{ types: Types.ObjectId, ref: 'User-Goods'}]
})
//про связку таблиц БД(DB) 28.50 (Links)

module.exports = model('Goods', schemaGoods)