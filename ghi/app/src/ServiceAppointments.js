import React from 'react';


class ServiceAppointments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            services: []
        }
    
    this.handleCompleteClick = this.handleCompleteClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    };
    

    async componentDidMount(){
        const url = "http://localhost:8080/api/service/submitted/";
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

    async handleCompleteClick(serviceid) {
        console.log(this.state.services)
        fetch(`http://localhost:8080/api/service/${serviceid}/complete/`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.reload();
        })
    }
    
    async handleCancelClick(serviceid) {
        console.log(this.state.services)
        fetch(`http://localhost:8080/api/service/${serviceid}/cancel/`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.reload();
        })
    }

    render() {
    return (
        <>
        <h1>Service Appointments</h1>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>VIP</th>
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
        {this.state.services.map(appointment => {
            return (
            <tr key= {appointment.id}>
            <td>{JSON.stringify(appointment.vip)}</td>
            <td>{appointment.vin}</td>
            <td>{appointment.customer}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.description}</td>
            <td>{appointment.technician.name}</td>
            <td>
            <button onClick={() => this.handleCancelClick(appointment.id)} type="button" className="btn btn-outline-danger me-2">Cancel</button>
            <button onClick={() => this.handleCompleteClick(appointment.id)} type="button" className="btn btn-outline-success">Completed</button>
            </td>
            </tr>
            );
        })}
        </tbody>
      </table>
      </>
    );
        }

  }
  
  export default ServiceAppointments;