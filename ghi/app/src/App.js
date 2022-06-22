import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import SalesForm from './SalesForm';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Customer/" element={<CustomerForm />} />
          <Route path="/sales/" element={<SalesForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
