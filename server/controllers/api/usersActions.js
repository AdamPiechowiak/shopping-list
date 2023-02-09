const { Product } = require('../../db/models/Product')
const { User } = require('../../db/models/User')
const bcrypt = require("bcrypt")
const Joi = require("joi")
//const { salt } = require('./config')

class UserActions 
{
    //zapisywanie użytkownika
    async saveUser(req, res) {
        //console.log("dodawanie uz")
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(409).send({ message: "Użytkownik o takim emailu już istnieje!" })
        }


        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            password: hashPassword,
            email: email,
            list: []
        })

        await newUser.save()

        //console.log('zapisanie urzytkownika ' + firstName + " " + lastName + " " + hashPassword + " " + email)
        res.status(201).json(newUser)
    }

    //logowanie użytkownika
    async logUser(req, res) {


        const validate = (data) => {
            const schema = Joi.object({
                email: Joi.string().email().required().label("Email"),
                password: Joi.string().required().label("Password"),
            })
            return schema.validate(data)
        }

        try {
            const { error } = validate(req.body);
            if (error)
                return res.status(400).send({ message: error.details[0].message })
            const user = await User.findOne({ email: req.body.email })
            if (!user)
                return res.status(401).send({ message: "Błędny email lub hasło!" })
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPassword)
                return res.status(401).send({ message: " Błędny email lub hasło!" })
            const token = user.generateAuthToken();
            res.status(200).send({ data: token, message: "Zalogowano!" })
        } catch (error) {
            res.status(500).send({ message: "Wewnętrzny błąd serwera!"})
        }

    }


    //pobieranie produktów od użytkownika o id
    async getAllProducts(req, res) {
        const id = req.params.id
        const doc = await User.findOne({ _id: id })

        //console.log("pobranie produktów")
        res.status(200).json(doc["list"])
    }

    //pobieranie produktu o danym id
    async getProduct(req, res) {
        const id = req.params.id

        const users = await User.find({})
        users.forEach(user => {
            user["list"].forEach(element => {
                if (element["_id"] == id) {
                    //console.log('pobranie produktu ' + id)
                    return res.status(200).json(element)

                }
            })
        })


        //console.log('nie znaleziono produktu ' + id)
        res.status(500).json({ message: "nie znalezono" })

    }

    //zapisanie produktu dla od użytkownika o id
    async saveProduct(req, res) {
        const id = req.params.id
        const name = req.body.name
        const description = req.body.description
        const quantity = req.body.quantity

        if (name == null || name=="") {
            res.status(422).json({ message: "brak pola name" })
        }
        else {
            const user = await User.findOne({ _id: id })

            const p = new Product({
                name: name,
                description: description,
                quantity: quantity
            })

            user["list"].push(p)
            await user.save()
            res.status(201).json(p)
        }
    }

    //edytowanie  produktu
    async updateProduct(req, res) {
        const id = req.params.id
        const name = req.body.name
        const description = req.body.description
        const quantity = req.body.quantity
        if (name == null || name == "") {
            res.status(422).json({ message: "brak pola name" })
        }
        else {
            const users = await User.find({})

            let uid = ""

            users.forEach(user => {
                user["list"].forEach(element => {
                    if (element["_id"] == id) {
                        uid = user.id
                    }
                })
            })

            const us = await User.findOne({ _id: uid })
            const lista = []
            us["list"].forEach(element => {
                if (element["_id"] != id) {
                    lista.push(element)
                }
                else {
                    let p = new Product({
                        name: name,
                        description: description,
                        quantity: quantity
                    })
                    p["_id"] = element["_id"]
                    lista.push(p)
                }
            })


            us.list = lista
            await us.save()
            //console.log('aktualizacja produktu ' + name + " " + description + " " + quantity + " " + id)
            res.status(201).json(us)
        }
    }

    //usuwanie produktu
    async deleteProduct(req, res) {
        const id = req.params.id


        const users = await User.find({ })

        let uid =""

        users.forEach(user => {
            user["list"].forEach(element => {
                if (element["_id"] == id) {
                    uid = user.id
                }
            })
        })

        const us = await User.findOne({ _id: uid })
        const lista = []
        us["list"].forEach(element => {
            if (element["_id"] != id) {
                lista.push(element)
            }
        })


        us.list = lista
        await us.save()
        //console.log('usuniecie produktu ' + id)
        res.status(204).json() 


        
    }
}

module.exports = new UserActions()