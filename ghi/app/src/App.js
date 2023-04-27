import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import SaleList from './SaleList';
import SaleForm from './SaleForm';
import SalesPerson from './SalesPerson';
import SalesPersonHistory from './SalesPersonHistory';
import TechniciansForm from './TechnicianForm';
import TechniciansList from './Technicians';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="Sales/*">
            <Route path="" element={<SaleList />} />
            <Route path="new" element={<SaleForm />} />
            <Route path="customers/new" element={<CustomerForm />} />
            <Route path="salesperson">
              <Route path="new" element={<SalesPerson />} />
              <Route path="history" element={<SalesPersonHistory />} />
              </Route>
            </Route>

            <Route path="Services/*">
              <Route path='technicians/new' element={<TechniciansForm/>} />
              <Route path='technicians/list' element={<TechniciansList/>}/>
            </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
