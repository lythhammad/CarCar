import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import SalesPerson from './SalesPerson';
import SalesPersonHistory from './SalesPersonHistory';
import TechniciansForm from './TechnicianForm';
import TechniciansList from './Technicians';
import SaleForm from './SaleForm';

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
            <Route path="history" element={<SalesPersonHistory />} />
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
