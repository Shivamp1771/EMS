const express = require("express")

const {ApolloServer, UserInputError} = require('apollo-server-express');

const {GraphQLScalarType, Kind} = require('graphql');

require('./models/dbconnection')
const Model = require('./models/employeeModel')
const Counter = require('./models/counters')

//const initialEmployees = [];

// const aboutMessage = 'Welcome to GraphQL'; (Just testing)

// my initial data
// const InitialEmployeesData = [{FirstName: "Shivam",LastName:"Parekh",Age:22,DateOfJoining: "2000-05-05", Title: "Director",Department:"IT",EmployeeType:"PartTime"},
//                 {FirstName: "Tushar", LastName: "Upadhyay",Age:42,DateOfJoining:"2021-05-05",Title: "Manager", Department:"IT", EmployeeType:"PartTime"}];

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date Custom Scalar Type',
    serialize(value) {
        return (value.toISOString()).substring(0, 10); 
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if(ast.kind == Kind.INT) {
            const dateValue = new Date(ast.value);
            return isNaN(dateValue) ? undefined : dateValue;
        } else if(ast.kind == Kind.STRING) {
            const dateValue = new Date(ast.value);
            return isNaN(dateValue) ? undefined : dateValue;
        }
        return null;
    }
})

const typeDefs =`
enum TitleType {
    Employee
    Manager
    Director
    VP
}

enum Departments {
    IT
    Marketing
    HR
    Engineering
}

enum EmployeeTypes {
    FullTime
    PartTime
    Contract
    Seasonal
}

input EmployeeInputs {
    FirstName: String!
    LastName: String!
    Age: String!
    DateofJoining: Date!
    Title: TitleType!
    Department: Departments!
    EmployeeType: EmployeeTypes!
    CurrentStatus: String!
}

scalar Date

type Employee {
    id: Int!
	FirstName: String!
	LastName: String!
	Age: Int!
	DateofJoining: Date!
	Title: TitleType!
	Department: Departments!
	EmployeeType: EmployeeTypes!
	CurrentStatus: String!
},
type Query {
    about: String!,
    employeeDataList: [Employee!]!
}
type Mutation {
    employeeAdd(employee: EmployeeInputs!): Employee!
}`;

const resolvers = {
    Date: dateScalar,
    Query: {
        employeeDataList
    },
    Mutation: {
        employeeAdd
    }
};

function employeeDataList() {
    const employees = Model.find({})
    .then((employees)=>{
        return employees
    })
    return employees
}

function validateEmployee(employee) {
    console.log(employee)
    const emp_age = parseInt(employee.Age);
    const valid_name = '/^[a-zA-Z]$/';

    const errors = [];
    if ((!isNaN(employee.FirstName))|| valid_name.match(employee.FirstName==false))  {
        errors.push('FirstName is not Valid! Please enter a valid name')
    }
    if ((!isNaN(employee.LastName))|| valid_name.match(employee.LastName==false)) {
        errors.push('LastName is not Valid! Please enter a valid name')
    }
    if ((emp_age<20) || (emp_age>70)) {
        errors.push('Age must be between 20 to 70')
    }
    console.log(errors.length)
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
}

async function getNextIDSequence(name) {
    const result = await Counter.findOneAndUpdate(
    { name: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
    );
    console.log(result)
    return result.current;
}

async function employeeAdd(_, {employee}) {
    validateEmployee(employee);
     employee.id = await getNextIDSequence('employees');
    await Model.create(employee)
        .then(counter => {
            console.log(counter)
        })
        .catch(error=>{
            res.json(error)
        }) 
    return employee;
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
     },
});

const app = express();

app.use(express.static('public'));

server.start().then(() => {
    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: true,
    });
});

app.listen(4000, function(){
    console.log("Server listening on Port # 4000");
})