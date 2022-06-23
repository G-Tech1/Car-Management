function ManufacturerList (props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.manufacturer.map(manufacturers => {
            return (
              <tr key={manufacturers.href}>
                <td>{manufacturers.customer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default ManufacturerList;