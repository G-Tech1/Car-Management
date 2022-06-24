import { useState } from "react";

function SalesPersonHistory(props) {
  let [search, setSearch] = useState();

  function searchOnChange(event) {
    setSearch(Number(event.target.value));
  }

  return (
    <>
      <h1>Sales Person History</h1>
      <select onChange={searchOnChange} value={search} id='sales_person' className="form-select">
        <option value="">Choose a sales person</option>
        {props.person.map(person => {
          return (
            <option key={person.id} value={person.id}>{person.name}</option>

          )
        })}

      </select>

      <table className="table table-striped">


        <thead>
          <tr>
            <th>Customer</th>
            <th>Sales Person</th>
            <th>Car vin number</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.records.filter(x => x.sales_person.id === search).map(record => {
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
    </>
  );
}

export default SalesPersonHistory;