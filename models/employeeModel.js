const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema= new Schema(
    {
        id: Number,
        FirstName: String,
        LastName: String,
        Age: Number,
        DateofJoining: {
            type: Date
        },
        Title: String,
        Department: String,
        EmployeeType: String,
        CurrentStatus: Boolean
    }
);

const Employee = mongoose.model('Employee', EmployeeSchema, "employees");
module.exports = Employee;