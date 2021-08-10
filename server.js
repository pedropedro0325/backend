const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

//create express app
const app = express();





mongoose.Promise = global.Promise;


//connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=>{
    console.log("Successfully connected to DB")
}).catch(err => {
    console.log('Error could not conect',err);
    process.exit();
})



//parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//parse requests of content-type application/json
app.use(bodyParser.json());


//define a simple route

app.get('/', (req,res) => {
    res.json({"message": "Welcome to Easynote"});
});

require('./app/routes/note.routes.js')(app)

app.listen(3500, ()=> {
    console.log("server is listening on port 3500");
})