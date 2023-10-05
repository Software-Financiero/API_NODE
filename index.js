const express = require('express')
const bodyParser = require('body-parser')
const { swaggerDocs: V1SwaggerDocs } = require('./src/v1/swagger')
const cors = require('cors')
const PibRoute = require('./src/v1/routes/macroeconomicos/pibRoutes')
const IedRoute = require('./src/v1/routes/macroeconomicos/iedRoutes')
const InflacionRoute = require('./src/v1/routes/macroeconomicos/inflacionRoutes')
const DesempleoRoute = require('./src/v1/routes/macroeconomicos/desempleoRoutes')
const DeudaPublicaRoute = require('./src/v1/routes/macroeconomicos/deudaPublicaRoutes')
const dotenv = require('dotenv')
const { dbConnect } = require('./config/mongo')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// routes
app.use(PibRoute)
app.use(IedRoute)
app.use(InflacionRoute)
app.use(DesempleoRoute)
app.use(DeudaPublicaRoute)

app.use(bodyParser.json())

const corsOrigin ={
  origin:'http://localhost:5173', //or whatever port your frontend is using
  credentials:true,            
  optionSuccessStatus:200
}

app.use(cors(corsOrigin))
// #endregion

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Welcome to my API' })
})

dbConnect()

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`)
  V1SwaggerDocs(app, PORT)
})
