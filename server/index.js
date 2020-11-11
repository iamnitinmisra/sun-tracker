require("dotenv").config();
const express = require("express");
const ctrl = require('./ctrl/controller')

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
// app.use(express.static(`${__dirname}/../build`));

app.get('/sun/set', ctrl.getTimesForToday)
app.post('/sun/set', ctrl.getTimesByDate)
   
app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
});