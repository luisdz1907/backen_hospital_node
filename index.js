const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();

//Configuration CORS
app.use(cors());

//Read Body
app.use(express.json());

//Database
dbConnection();

//Routes
app.use("/api/usuarios", require("./routes/user"));
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
//app.use( '/api/todo', require('./routes/busquedas') );
app.use("/api/login", require("./routes/auth"));
//app.use( '/api/upload', require('./routes/uploads') );

app.listen(process.env.PORT, () => {
  console.log("Servidor Corriendo En El Puerto 3000");
});
