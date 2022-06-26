const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/basicToken", { 
    useNewUrlParser: true,
    useunifiedTopology: true
})

    .then(db => console.log('Database connection has been created'))