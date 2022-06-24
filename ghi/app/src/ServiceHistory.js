import React from 'react';

    class ServiceHistory extends React.Component {
        constructor(props) {
            super(props);
            this.state = { 
                vin: '',
                services: []
            }

            this.handleOnSubmit = this.handleOnSubmit.bind(this);
            this.handleVinChange = this.handleVinChange.bind(this);
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


    async handleOnSubmit(event) {
        event.preventDefault()
        const newState = [...this.state ]
        delete newState.services 
        const servicesUrl = `http://localhost:8080/api/service/`;
        const fetchConfig = {
            method: "get",
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(servicesUrl, fetchConfig)
        if (response.ok) {
            const newHistory = await response.json();
            this.state.services = newHistory.services
            console.log(newHistory)
            const filtered = this.state.services.filter(obj =>{
                return obj.vin === this.state.vin
            })
            console.log(filtered)
            const cleared = {
                service: ''
            }
            this.setState(cleared)
            console.log(newState)
        } 

        
    }
    

    handleVinChange(event) {
        const value = event.target.value
        this.setState({ vin: value })
      }
    //   type="search"

    render() {
    return (
        <>
        <h1>Service Appointment History</h1>
        <form onSubmit={this.handleOnSubmit} id="search-vin" method='get'>
        <input value={this.state.vin} onChange={this.handleVinChange}
        type ='search' className='table table-hover' id='vin'
        placeholder='Enter VIN' />
        </form>
        <table className="table table-striped">
        <thead>
          <tr>
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
        {this.state.services.filter(
            service => service.vin === this.state.vin).map(
                appointment => {
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
        })}
        </tbody>
      </table>
      </>
    );
        }

  }
  
  export default ServiceHistory;