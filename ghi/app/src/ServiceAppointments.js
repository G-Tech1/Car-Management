import React from 'react';


    class ServiceAppointments extends React.Component {
        constructor(props) {
            super(props);
            this.state = { 
                services: []
            }};
    

    async componentDidMount(){
        const url = "http://localhost:8080/api/service/";
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
            <th>Description</th>
            <th>Technician</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {this.state.services.map(appointment => {
            return (
            <tr key= {appointment.id}>
            <td></td>
            <td>{appointment.vin}</td>
            <td>{appointment.customer}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.description}</td>
            <td>{appointment.technician.name}</td>
            <td>
            <button onClick={null} type="button" className="btn btn-outline-danger me-2">Cancel</button>
            <button onClick={null} type="button" className="btn btn-outline-success">Completed</button>
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