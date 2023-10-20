const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config()

// crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// obtener variable de entorno
const port = process.env.PORT

// mostrar el index del directorio público
// middleware
// apuntar al index de la carpeta públic
app.use(  express.static('public'));

// leer Json
app.use(express.json())

//* Rutas auth // crear, login
app.use('/api/auth', require('./routes/auth'))
//* Rutas eventos
app.use('/api/events', require('./routes/event'))
//* Rutas laptop
app.use('/api/laptop', require('./routes/laptop'))
//* Ruta perifericos
app.use('/api/periferico', require('./routes/periferico'))
//* Ruta monitores
app.use('/api/monitor', require('./routes/monitor'))
//* Ruta inventarios
app.use('/api/inventory', require('./routes/inventory'))


// escuchar peticiones
app.listen( port, () => {
    console.log(`server running on ${port}`);
})