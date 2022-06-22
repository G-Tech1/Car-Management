import React from 'react';

class ServiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: '',
      customer: '',
      date: '',
      time: '',
      description: '',
      technician:'',
      technicians: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeVin = this.handleChangeVin.bind(this);
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTechnician = this.handleChangeTechnician.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/technician/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.conferences });
    }
  }



  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.employee_number= data.employeeNumber
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
            name:'',
            employeeNumber:''
        };
        
        this.setState(cleared);
    }
  }


  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangeEmail(event) {
    const value = event.target.value;
    this.setState({ employeeNumber: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add A Technician</h1>
            <form onSubmit={this.handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.roomCount} onChange={this.handleEmployeeNumberChange} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                <label htmlFor="employee_number">Room count</label>
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
