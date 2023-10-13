const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const { MONGO_URI } = process.env

const dbConnect = () => {
  const contectionString = MONGO_URI
  mongoose.connect(contectionString, {
    // useNewUrlParser utiliza para indicar a Mongoose que utilice la nueva cadena de conexión de MongoDB en lugar de la antigua cadena de conexión. Si se tiene activada asegura que toda la configuaracion se establezca correctamente
    useNewUrlParser: true,
    // useUnifiedTopology habilitada, Mongoose utiliza la nueva topología de MongoDB y asegura que todas las opciones de configuración se establezcan correctamente.
    useUnifiedTopology: true
  })
    .then(() => console.log('Connection '))
    .catch(err => console.log(err))
}

module.exports = { dbConnect }
