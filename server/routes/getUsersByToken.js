const router = require("express").Router()
const { User } = require("../db/models/User")
router.get("/", async (req, res) => {
    //pobranie wszystkich u¿ytkowników z bd:
    User.find().exec()
        .then(async () => {
            const users = await User.find();
            //konfiguracja odpowiedzi res z przekazaniem listy u¿ytkowników:
            res.status(200).send({ data: users, message: "Lista u¿ytkowników" });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
})
module.exports = router