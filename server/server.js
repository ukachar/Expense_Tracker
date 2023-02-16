const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: "./config.env" })

const port = process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json())

//mongodb connection
const con = require('./db/connection')


//using routes
app.use(require('./routes/route'))



con.then(db => {
    if (!db) return process.exit(1);
    //LISTEN TO THE HTTP SERVER
    app.listen(port, () => {
        console.log(`Server is running on port: https://localhost:${port}`)
    })

    app.on('error', err => console.log("Failed to connect with http server: " + err))
}).catch(error => {
    console.log('Connection Failed...! ' + error)
})



