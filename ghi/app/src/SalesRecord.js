function SalesRecord(props) {
    return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Car vin number</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {props..map(attendee => {
              return (
                <tr key={attendee.href}>
                  <td>{ attendee.name }</td>
                  <td>{ attendee.conference }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
}