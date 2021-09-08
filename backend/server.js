const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const passport = require('passport');
const serveStatic = require('serve-static');



const app = express();
const router = express.Router();
app.use(serveStatic(__dirname + "/dist"));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

//connect to mongodb
mongoose.connect('mongodb://localhost/movie_rating_app',  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true, //make this true
    autoIndex: true, //make this also true
})
.then(() => {
    console.log('Connected to mongoDB');
})
.catch(err => {
 console.error('App starting error:', err.stack);
 process.exit(1);
});
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});
const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
// Include controllers
fs.readdirSync("controllers").forEach(function (file) {
    if(file.substr(-3) == ".js") {
    const route = require("./controllers/" + file)
    route.controller(app)
    }
   })
   