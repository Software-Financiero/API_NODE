const express = require('express')
const bodyParser = require('body-parser')
const { swaggerDocs: V1SwaggerDocs } = require('./src/v1/swagger')
const cors = require('cors')
const dotenv = require('dotenv')
const { Server } = require('socket.io')
const { Worker } = require('node:worker_threads')
const http = require('http')
const PibRoute = require('./src/v1/routes/macroeconomicos/pibRoutes')
const IedRoute = require('./src/v1/routes/macroeconomicos/iedRoutes')
const InflacionRoute = require('./src/v1/routes/macroeconomicos/inflacionRoutes')
const DesempleoRoute = require('./src/v1/routes/macroeconomicos/desempleoRoutes')
const DeudaPublicaRoute = require('./src/v1/routes/macroeconomicos/deudaPublicaRoutes')
const MonedaRoute = require('./src/v1/routes/microeconomicos/moneda')
const worker = new Worker('./src/worker/worker.js')

const { dbConnect } = require('./config/mongo')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
dbConnect()

app.use(cors({
  origin: '*'
}))

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes

app.use(PibRoute)
app.use(IedRoute)
app.use(InflacionRoute)
app.use(DesempleoRoute)
app.use(DeudaPublicaRoute)
app.use(MonedaRoute)

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Welcome to my API' })
})

app.get('/websocket', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

let socket = null

io.on('connection', (socketClient) => {
  socket = socketClient

  socket.on('disconnect', () => {
    console.log('Disconnect')
  })
})

// worker
worker.postMessage('start')

worker.on('message', async (message) => {
  if (socket !== null && message.message === 'live') {
    socket.emit('live', message.monedaLive)
  }
})

server.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`)
  V1SwaggerDocs(app, PORT)
})
