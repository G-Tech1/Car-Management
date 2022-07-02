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
    this.handleChangeVin = this.handleChange.bind(this);
  }


  async componentDidMount() {
    const url = 'http://localhost:8080/api/technician/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technician });
      console.log(data)
    }
  }


  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    console.log(data)
    delete data.technicians;
    console.log(data)

    const serviceUrl = 'http://localhost:8080/api/service/';
    console.log(data)
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const serviceResponse = await fetch(serviceUrl, fetchOptions);
    console.log(serviceResponse)
    if (serviceResponse.ok) {
        const newService = await serviceResponse.json();
        console.log(newService);
        
        this.setState(this.state);
    }
  }


  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Service Appointment</h1>
            <form onSubmit={this.handleSubmit} id="create-service-form">
              <div className="form-floating mb-3">
                <input value={this.state.vin} onChange={this.handleChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.customer} onChange={this.handleChange} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.date} onChange={this.handleChange} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.time} onChange={this.handleChange} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                <label htmlFor="time">Time</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.description} onChange={this.handleChange} placeholder="Description" required type="text" name="description" id="description" className="form-control" />
                <label htmlFor="description">Description</label>
              </div>
              <div className="mb-3">
                <select value={this.state.technician} onChange={this.handleChange} required name="technician" id="technician" className="form-select">
                    <option value="">Choose a technician</option>
                    {this.state.technicians.map(technician => {
                        return (
                        <option key={technician.id} value={technician.employee_number}>
                            {technician.name}
                        </option>
                        );
                    })}
                    </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
}

export default ServiceForm;
