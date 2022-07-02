import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="dropdown">
        <NavLink className="navbar-brand" to="/">Car Manage</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Inventory
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <NavLink className="dropdown-item" aria-current="page" to="manufacturer">Add Manufacturer</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="manufacturers">All Manufacturers</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="model">Add Model</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="models">All Models</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="automobile">Add Automobiles</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="automobiles">All Automobiles</NavLink>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sales
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <NavLink className="dropdown-item" aria-current="page" to="record">Record Sale</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="records">All Sales</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="salesperson">Add Sales Person</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="sales">Sales Person History</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="customer">Add Customer</NavLink>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Service
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <NavLink className="dropdown-item" aria-current="page" to="service/new">Add Appointment</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="service/appointments">Scheduled Appointments</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="service/history">Appointment History</NavLink>
                <NavLink className="dropdown-item" aria-current="page" to="service/technician">Add Technician</NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
