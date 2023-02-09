const mongoose = require('mongoose')
const Joi = require("joi")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: false},
    quantity: { type: String, required: false}
})

const Product = mongoose.model('Product', productSchema)

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("name"),
        description: Joi.string().required().label("description"),
        quantity: Joi.string().required().label("quantity")
    })
    return schema.validate(data)
}

module.exports = { Product, validate }