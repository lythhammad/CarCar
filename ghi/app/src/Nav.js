import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/Sales" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Sales
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="/Sales/customers/create">Customer Form</NavLink></li>
                <li><NavLink className="dropdown-item" to="/Sales/salespeople/create">Salesperson Form</NavLink></li>
                <li><NavLink className="dropdown-item" to="/Sales/salespeople/list">Salesperson List</NavLink></li>
                <li><NavLink className="dropdown-item" to="Sales/salespeople/history"> Salesperson History</NavLink></li>
                <li><NavLink className="dropdown-item" to="Sales/sales/all"> All Sales</NavLink></li>
                <li><NavLink className="dropdown-item" to="Sales/form">Sale Form</NavLink></li>
              </ul>
            </li>

            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/Services/technicians/new">Add a Technician</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/Services/technicians/list">Technicians</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/Services/service/history">Service History</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/Services/service/appointments">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/Services/manufacturs/list">Manufacturs</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/Services/create/manufacturs">Create Manufacturs</NavLink>
            </li>

        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Nav;
