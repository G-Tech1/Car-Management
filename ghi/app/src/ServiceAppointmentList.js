function ServiceAppointmentList(props) {
    const deleteServiceAppointment = async (id) => {
        fetch(`	http://localhost:8080/api/service/${id}/`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.reload();
        })
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>

          {props.services.map(service => {
            return (
              <tr key={service.id}>
                <td>{ service.vin}</td>
                <td>{ service.customer}</td>
                <td>{ service.date}</td>
                <td>{ service.time}</td>
                <td>{ service.description}</td>
                <td>{ service.technician.name}</td>
                <td>
                <button onClick={() => deleteServiceAppointment(service.id)} type="button" className="btn btn-primary">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default ServiceAppointmentList;