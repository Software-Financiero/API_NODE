const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
const cors = require("cors");

//#region
const v1RoutesRouter = require("./v1/routes/macroeconomicos/pibRoutes");

//#endregion

async function main() {
  try {
    const app = express();
    const PORT = 3007|| 3006;
    mongoose.connect("mongodb+srv://ortizcolpaswilcardaniel:xxYZHlMeFxi8lQrI@cluster0.0gtsjru.mongodb.net/BD_FINACIERA?retryWrites=true&w=majority")   
    app.use(bodyParser.json());
    app.use(cors({ origin: `http://localhost:${PORT}` }));

    app.use("/api/v1/pib", v1RoutesRouter);

    app.listen(PORT, () => {
      console.log(`API is listening on port ${PORT}`);
      V1SwaggerDocs(app, PORT);
    });
  } catch (error) {
    console.error(`Express server error ${error}`);
  }
}

main();
