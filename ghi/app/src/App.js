import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import SalesForm from './SalesForm';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import NewSaleForm from './NewSaleForm';
import React from "react"
import SalesRecord from './SalesRecord';
import SalesPersonHistory from './SalePersonHistory';
import Manufacturerlist from './ManufacturerList';
import ManufacturerList from './ManufacturerList';








class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      records: [],
      salesPerson: [],
      manufacturers: [],
      vehicles: [],
      automobiles: [],
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
      this.setState({records: data.records})
    }
    if (response.ok){
      const data = await response2.json();
      console.log(data)
      this.setState({salesPerson: data.sales_person})
    }
    if (response.ok){
      const data = await response3.json();
      this.setState({manufacturers: data.manufacturer})
    }
    if (response.ok){
      const data = await response4.json();
      this.setState({vehicles: data.vehicles})
  }
  if (response.ok){
    const data = await response5.json();
    this.setState({automobiles: data.automobiles})
  }
}
  render(){
    return (
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/new/Customer/" element={<CustomerForm />} />
            <Route path="/new/sales/" element={<SalesForm />} />
            <Route path="/new/records/" element={<NewSaleForm />} />
            <Route path="/records/" element={<SalesRecord records={this.state.records} />} />
            <Route path="/sales/records" element={<SalesPersonHistory person ={this.state.salesPerson} records ={this.state.records}/>} />
            <Route path="/manufacturers/" element={<ManufacturerList manufacturer ={this.state.manufacturers}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
