const EmployeeData = [];

class EmployeeRow extends React.Component {
    render() {    
        const employee=this.props.employee;
        return(
        <tr>
            <td>{employee.id}</td>
            <td>{employee.FirstName}</td>
            <td>{employee.LastName}</td>
            <td>{employee.Age}</td>
            <td>{employee.DateofJoining}</td>
            <td>{employee.Title}</td>
            <td>{employee.Department}</td>
            <td>{employee.EmployeeType}</td>
            <td>{employee.CurrentStatus}</td>
        </tr>
        )        
    }
}
class EmployeeSearch extends React.Component {
    render() {
        return(
            <div className="body-contents">
            {/* <h3>Search Employee</h3> */}
            </div>
        )
    }
}
class EmployeeTable extends React.Component {
    render() {
        const EmployeeRows = this.props.employees.map(employee =>
             <EmployeeRow key={employee.id} employee={employee}/>)
        return(
            <div className="table-responsive body-contents">
            <h3>Employee List</h3>
            <table className="bordered-table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Date of Joining</th>
                            <th>Title</th>
                            <th>Department</th>
                            <th>Employee Type</th>
                            <th>Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EmployeeRows}
                    </tbody>
                </table>
            </div>
        )
    }
}
class EmployeeCreate extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.EmployeeAdd;
        const employee = {
            FirstName: form.firstname.value,
            LastName: form.lastname.value,
            Age: form.age.value,
            DateofJoining: form.dateofjoining.value,
            Title: form.title.value,
            Department: form.department.value,
            EmployeeType: form.type.value,
            CurrentStatus: form.currentstatus.value,
        }
        this.props.createEmployee(employee);
        form.firstname.value = "";
        form.lastname.value = "";
        form.age.value = "";
    }

    render() {
        return(
            <div className="body-contents">
            <h3>Add Employee</h3>
            <form name="EmployeeAdd" onSubmit={this.handleSubmit}>
                    <label for="firstname">First Name</label>
                    <input type="text" name="firstname" placeholder="FirstName" />
                    <label for="lastname">Last Name</label>
                    <input type="text" name="lastname" placeholder="LastName" />
                    <label for="age">Age</label>
                    <input type="Number" name="age" placeholder="Age" />
                    <label for="dateofjoining">Date of Joining</label>
                    <input type="date" name="dateofjoining" />
                    <label for="title">Title</label>
                    <select name="title">
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Director">Director</option>
                        <option value="VP">VP</option>
                    </select>
                    <label for="department">Department</label>
                    <select name="department">
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Engineering">Engineering</option>
                    </select>
                    <label for="type">Employee Type</label>
                    <select name="type">
                        <option value="FullTime">FullTime</option>
                        <option value="PartTime">PartTime</option>
                        <option value="Contract">Contract</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                    <label for="currentstatus">Current Status</label>
                    <select name="currentstatus">
                        <option value="true">Working</option>
                        <option value="false">Retired</option>
                    </select>
                    <button>Add</button>
            </form>
            </div>
        )
    }
}
class EmployeeDirectory extends React.Component {
    constructor() {
        super();
        this.state = {employees: []};
        this.createEmployee = this.createEmployee.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        /*
        setTimeout(() => {
            this.setState({ employees: EmployeeData });
        }, 1000);
        */
        const query = `query {
            employeeDataList {
                id
                FirstName
                LastName
                Age
                DateofJoining
                Title
                Department
                EmployeeType
                CurrentStatus
            }
          }`;

        async function EmployeeData(url='', data={}) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ query })
            });
            return response.json();
        }

        const result = EmployeeData('/graphql', query)
            .then(result =>{                    
                console.log(result.data.employeeDataList);
                this.setState({ employees: result.data.employeeDataList });
                return result.data.employeeDataList;                   
        })
    }

     async createEmployee(employee) {

        const query = `
            mutation employeeAdd($employee: EmployeeInputs!) {
                employeeAdd(employee: $employee) {
                    id
                    FirstName
                    LastName
                    Age
                    DateofJoining
                    Title
                    Department
                    EmployeeType
                    CurrentStatus 
                } 
            }`;
        const data = await graphQLFetch(query, {employee});
        if (data) {
            this.loadData();
        }
    }
    render(){
        return(
            <div>
                <EmployeeSearch />
                <EmployeeTable employees={this.state.employees}/>
                <EmployeeCreate createEmployee={this.createEmployee}/>
            </div>
        )
    }
}


const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
}
async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query, variables })
        });
        
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);
        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code == 'BAD_USER_INPUT') {
                const details = error.extensions.errors.join('\n ');
                alert(`${error.message}:\n ${details}`);
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
    }
}

const element = <EmployeeDirectory />
ReactDOM.render(element,document.getElementById('contents'))