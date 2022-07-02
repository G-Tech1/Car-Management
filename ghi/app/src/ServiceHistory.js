import React from 'react';

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            vin: '',
            services: []
        }

        this.handleChange = this.handleChange.bind(this);
    };
        
    async componentDidMount(){
        const url = `http://localhost:8080/api/service/`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json()
            this.setState(
                { 
                services: data.service,
            });
            console.log(data)

        } else {
            console.error(response)
        }
    }


    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
      }


    render() {
    return (
        <>
        <h1>Service Appointment History</h1>
        <input value={this.state.vin} onChange={this.handleChange}
        type ='search' className='table table-hover' id='vin'
        placeholder='Enter VIN' />
        <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Technician</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {this.state.vin ==='' ? this.state.services.map(appointment => {
            return (
            <tr key= {appointment.id}>
            <td>{appointment.vin}</td>
            <td>{appointment.customer}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.description}</td>
            <td>{appointment.technician.name}</td>
            <td>{appointment.status.name}</td>
            </tr>
            );
        }) : this.state.services.filter(
            service => service.vin === this.state.vin).map(
                appointment => {
            return (
            <tr key= {appointment.id}>
            <td>{appointment.vin}</td>
            <td>{appointment.customer}</td>
            <td>{appointment.date.toLocaleString("en-US")}</td>
            <td>{appointment.time}</td>
            <td>{appointment.description}</td>
            <td>{appointment.technician.name}</td>
            <td>{appointment.status.name}</td>
            </tr>
            );
        })}
        </tbody>
      </table>
      </>
    );
        }

  }
  
  export default ServiceHistory;