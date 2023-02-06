const EmployeeData = [];

class EmployeeRow extends React.Component {
  render() {
    const employee = this.props.employee;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, employee.id), /*#__PURE__*/React.createElement("td", null, employee.FirstName), /*#__PURE__*/React.createElement("td", null, employee.LastName), /*#__PURE__*/React.createElement("td", null, employee.Age), /*#__PURE__*/React.createElement("td", null, employee.DateofJoining), /*#__PURE__*/React.createElement("td", null, employee.Title), /*#__PURE__*/React.createElement("td", null, employee.Department), /*#__PURE__*/React.createElement("td", null, employee.EmployeeType), /*#__PURE__*/React.createElement("td", null, employee.CurrentStatus));
  }

}

class EmployeeSearch extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "body-contents"
    });
  }

}

class EmployeeTable extends React.Component {
  render() {
    const EmployeeRows = this.props.employees.map(employee => /*#__PURE__*/React.createElement(EmployeeRow, {
      key: employee.id,
      employee: employee
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "table-responsive body-contents"
    }, /*#__PURE__*/React.createElement("h3", null, "Employee List"), /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Employee ID"), /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, EmployeeRows)));
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
      CurrentStatus: form.currentstatus.value
    };
    this.props.createEmployee(employee);
    form.firstname.value = "";
    form.lastname.value = "";
    form.age.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "body-contents"
    }, /*#__PURE__*/React.createElement("h3", null, "Add Employee"), /*#__PURE__*/React.createElement("form", {
      name: "EmployeeAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("label", {
      for: "firstname"
    }, "First Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "firstname",
      placeholder: "FirstName"
    }), /*#__PURE__*/React.createElement("label", {
      for: "lastname"
    }, "Last Name"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "lastname",
      placeholder: "LastName"
    }), /*#__PURE__*/React.createElement("label", {
      for: "age"
    }, "Age"), /*#__PURE__*/React.createElement("input", {
      type: "Number",
      name: "age",
      placeholder: "Age"
    }), /*#__PURE__*/React.createElement("label", {
      for: "dateofjoining"
    }, "Date of Joining"), /*#__PURE__*/React.createElement("input", {
      type: "date",
      name: "dateofjoining"
    }), /*#__PURE__*/React.createElement("label", {
      for: "title"
    }, "Title"), /*#__PURE__*/React.createElement("select", {
      name: "title"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP")), /*#__PURE__*/React.createElement("label", {
      for: "department"
    }, "Department"), /*#__PURE__*/React.createElement("select", {
      name: "department"
    }, /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering")), /*#__PURE__*/React.createElement("label", {
      for: "type"
    }, "Employee Type"), /*#__PURE__*/React.createElement("select", {
      name: "type"
    }, /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "FullTime"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "PartTime"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal")), /*#__PURE__*/React.createElement("label", {
      for: "currentstatus"
    }, "Current Status"), /*#__PURE__*/React.createElement("select", {
      name: "currentstatus"
    }, /*#__PURE__*/React.createElement("option", {
      value: "true"
    }, "Working"), /*#__PURE__*/React.createElement("option", {
      value: "false"
    }, "Retired")), /*#__PURE__*/React.createElement("button", null, "Add")));
  }

}

class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
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

    async function EmployeeData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query
        })
      });
      return response.json();
    }

    const result = EmployeeData('/graphql', query).then(result => {
      console.log(result.data.employeeDataList);
      this.setState({
        employees: result.data.employeeDataList
      });
      return result.data.employeeDataList;
    });
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
    const data = await graphQLFetch(query, {
      employee
    });

    if (data) {
      this.loadData();
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }), /*#__PURE__*/React.createElement(EmployeeCreate, {
      createEmployee: this.createEmployee
    }));
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
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

const element = /*#__PURE__*/React.createElement(EmployeeDirectory, null);
ReactDOM.render(element, document.getElementById('contents'));