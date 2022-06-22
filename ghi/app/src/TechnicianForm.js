import React from 'react';

class TechnicianForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      employeeNumber: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmployeeNumber = this.handleChangeEmployeeNumber.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    console.log(data)
    data.employee_number = data.employeeNumber
    console.log(data)
    delete data.employeeNumber;


    const technicianUrl = 'http://localhost:8080/api/technician/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const technicianResponse = await fetch(technicianUrl, fetchOptions);
    if (technicianResponse.ok) {
        const newTechnician = await technicianResponse.json();
        console.log(newTechnician);
        
        const cleared = {
            name: '',
            employeeNumber: '',
        };
        this.setState(cleared);
    }
  }


  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangeEmployeeNumber(event) {
    const value = event.target.value;
    this.setState({ employeeNumber: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add A Technician</h1>
            <form onSubmit={this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleChangeName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.employeeNumber} onChange={this.handleChangeEmployeeNumber} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
}

export default TechnicianForm;
