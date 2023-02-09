const express = require('express')
const app = express()
const { port } = require('./config')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api')
const cors = require('cors')
const userListRoutes = require("./routes/getUsersByToken")
const tokenVerification = require('./middleware/tokenVerification')
const usersActions = require('./controllers/api/usersActions')
const router = express.Router()

//db
require('./db/mongoose')

// parsery
//Content-type: application/json
app.use(bodyParser.json())

app.use(cors())

//zaloguj
router.post('/log', usersActions.logUser)
//routes

app.use('/api/', apiRouter)
app.use(tokenVerification)
app.use("/api/userlist", userListRoutes)

//server
app.listen(port, function () {
    console.log("serwer słucha... port "+port)
})