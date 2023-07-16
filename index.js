const express = require('express')
const app  = express();
const DbConnection = require('./database');
const cors= require('cors')
const mongoose = require('mongoose');

const security = require('./routes/security')
const visitor=require('./routes/visitor')
const student =require('./routes/student')
const staff= require('./routes/staff')

require('dotenv').config()

DbConnection();
app.use(express.json())
app.use(cors())



app.use('/v1',security)
app.use('/api/v1',visitor)
app.use('/api/v2',student)
app.use('/api/v3',staff)

app.listen(5000 ||  process.env.PORT , () => {
    console.log(`Port listen in ${process.env.PORT}`);
});

