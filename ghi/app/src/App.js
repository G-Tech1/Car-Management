import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import SalesForm from './SalesForm';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import ServiceForm from './ServiceForm';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelForm from './VehicleModelForm';
import AutomobileForm from './AutomobileForm';
import ServiceAppointments from './ServiceAppointments';
import ServiceHistory from './ServiceHistory';
import NewSaleForm from './NewSaleForm';
import React from "react"
import SalesRecord from './SalesRecord';
import SalesPersonHistory from './SalePersonHistory';
import ManufacturerList from './ManufacturerList';
import AutoMobileList from './Automobileslist';
import VehicleList from './Vehiclelist';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      records: [],
      salesPerson: [],
      manufacturers: [],
      models: [],
      autos: [],
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:8090/api/records/'
    const url2 = 'http://localhost:8090/api/sales/'
    const url3 = 'http://localhost:8100/api/manufacturers/'
    const url4 = 'http://localhost:8100/api/models/'
    const url5 = 'http://localhost:8100/api/automobiles/'

    const response = await fetch(url)
    const response2 = await fetch(url2)
    const response3 = await fetch(url3)
    const response4 = await fetch(url4)
    const response5 = await fetch(url5)
    if (response.ok) {
      const data = await response.json();
      this.setState({ records: data.records })
    }
    if (response.ok) {
      const data = await response2.json();
      this.setState({ salesPerson: data.sales_person })
    }
    if (response.ok) {
      const data = await response3.json();
      this.setState({ manufacturers: data.manufacturers })

    }
    if (response.ok) {
      const data = await response4.json();
      this.setState({ models: data.models })
    }
    if (response.ok) {
      const data = await response5.json();
      this.setState({ autos: data.autos })
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="customer" element={<CustomerForm />} />
            <Route path="salesperson" element={<SalesForm />} />
            <Route path="sales" element={<SalesPersonHistory person={this.state.salesPerson} records={this.state.records} />} />
            <Route path="record" element={<NewSaleForm />} />
            <Route path="records" element={<SalesRecord records={this.state.records} />} />
            <Route path="manufacturers" element={<ManufacturerList manufacturers={this.state.manufacturers} />} />
            <Route path="manufacturer" element={<ManufacturerForm />} />
            <Route path="automobiles" element={<AutoMobileList autos={this.state.autos} />} />
            <Route path="models" element={<VehicleList models={this.state.models} />} />
            <Route path="model" element={<VehicleModelForm />} />
            <Route path="automobile" element={<AutomobileForm />} />
            <Route path="service">
              <Route path="technician" element={<TechnicianForm />} />
              <Route path="appointments" element={<ServiceAppointments />} />
              <Route path="history" element={<ServiceHistory />} />
              <Route path="new" element={<ServiceForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
