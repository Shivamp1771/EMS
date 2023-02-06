require('./models/dbconnection')
const Employee = require('./models/employeeModel')
const Counter = require('./models/counters')

setTimeout(()=> {
    const employeeDB = [
        {
            id: 1, FirstName: "Shivam",LastName:"Parekh",Age:22,DateOfJoining: "2000-05-05", Title: "Director",Department:"IT",EmployeeType:"PartTime"}
    ]
     Employee.insertMany(employeeDB);

    Employee.find({})
        .then((employees)=>{
            console.log(employees)
        })


}, 1000)
    async function insertCounter() {
        Counter.remove({name: "employees"});

        await Counter.create({
            name: "employees",
            current: 0
        })
        .then(counter => {
            console.log(counter)
        })
        .catch(error=>{
            res.json(error)
        }) 
    }
    insertCounter();