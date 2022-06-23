import React from 'react';

    class ServiceHistory extends React.Component {
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
        <h1>Service History</h1>
        <input type="text" ></input><button className="btn btn-primary me-1">search</button>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
            <th>Technician</th>
          </tr>
        </thead>
        <tbody>
        {this.state.services.map(appointment => {
            return (
            <tr key= {appointment.id}>
            <td>{appointment.vin}</td>
            <td>{appointment.customer}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.description}</td>
            <td>{appointment.technician.name}</td>
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