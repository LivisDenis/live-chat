const express = require('express')
const {loginValidation, registerValidation} = require('./validations.js')
const checkAuth = require("./middleware/checkAuth.js")
const UserController = require("./controllers/UserController.js")
const cors = require("cors")
const handleValidationErrors = require("./utils/handleValidationErrors.js")
const mongoose = require("mongoose")
const ws = require('ws');
require('dotenv').config()

const PORT = process.env.PORT || 5001

const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
app.use(express.json())
app.use(cors())

app.get('/user/:id', UserController.getOne)
app.get('/auth/me', checkAuth, UserController.getMe)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/registration', registerValidation, handleValidationErrors, UserController.register)

app.ws('/', (ws, req) => {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message, id) {
    aWss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

// const wss = new ws.Server({
//     port: PORT,
// }, () => console.log(`Server started on 5000`))
//
//
// wss.on('connection', function connection(ws) {
//     ws.on('message', function (message) {
//         message = JSON.parse(message)
//         switch (message.event) {
//             case 'message':
//                 broadcastMessage(message)
//                 break;
//             case 'connection':
//                 broadcastMessage(message)
//                 break;
//         }
//     })
// })
//

const start = async () => {
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
