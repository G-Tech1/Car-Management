import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import SalesForm from './SalesForm';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import NewSaleForm from './NewSaleForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new/Customer/" element={<CustomerForm />} />
          <Route path="/new/sales/" element={<SalesForm />} />
          <Route path="/new/records/" element={<NewSaleForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
