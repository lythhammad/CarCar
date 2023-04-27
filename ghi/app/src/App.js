import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import SalesPersonForm from './SalesPersonForm';
import SalesPersonHistory from './SalesPersonHistory';
import TechniciansForm from './TechnicianForm';
import TechniciansList from './Technicians';
import SaleForm from './SaleForm';
import SalesPersonList from './SalesPersonList';
import SaleList from './SaleList';



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="Sales/*">
            <Route path="create" element={<SaleForm />} />
            <Route path="customers/create" element={<CustomerForm />} />
            <Route path="salespeople/history" element={<SalesPersonHistory />} />
            <Route path="salespeople/create" element={<SalesPersonForm />} />
            <Route path="salespeople/list" element={<SalesPersonList />} />
            <Route path="sales/all" element={<SaleList />} />
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
