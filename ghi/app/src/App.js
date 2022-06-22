import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import ServiceForm from './ServiceForm';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelForm from './VehicleModelForm';
import AutomobileForm from './AutomobileForm';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Customer/" element={<CustomerForm />} />
          <Route path="manufacturer" element={<ManufacturerForm />} />
          <Route path="model" element={<VehicleModelForm />} />
          <Route path="automobile" element={<AutomobileForm />} />
          <Route path="service">
            <Route path="technician" element={<TechnicianForm />} />
            <Route path="" element={<ServiceForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
