const mongoose = require('mongoose')
//database connection string
mongoose.connect('mongodb+srv://mongodbreactpractice:mongodbreactpractice@cluster0.llcx56s.mongodb.net/EmployeeManagement');

mongoose.connection.on("connected", function(){
    console.log("Application is connected to the database");
})
