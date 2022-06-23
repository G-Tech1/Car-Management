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
        {props.records.map(record => {
          return (
            <tr key={record.href}>
              <td>{record.customer.name}</td>
              <td>{record.sales_person.name}</td>
              <td>{record.auto.vin}</td>
              <td>{record.sales_price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SalesRecord;