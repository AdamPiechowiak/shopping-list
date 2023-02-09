const jwt = require("jsonwebtoken")
const { jwtprivatekey } = require('../config')

function tokenVerification(req, res, next) {
    //pobranie tokenu z nag³ówka:
    let token = req.headers["x-access-token"];
    if (!token) {
        res.status(403).send({ message: "No token provided!" });
    }
    //jeœli przes³ano token - weryfikacja jego poprawnoœci:
    jwt.verify(token, jwtprivatekey, (err, decodeduser) => {
        if (err) {
            console.log("Unauthorized!")
            res.status(401).send({ message: "Unauthorized!" });
        }
        console.log("Token poprawny, u¿ytkownik: " + decodeduser._id)
        req.user = decodeduser
        next()
    })
}
module.exports = tokenVerification