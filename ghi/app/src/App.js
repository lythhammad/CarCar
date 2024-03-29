import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import SalesPersonForm from './SalesPersonForm';
import SalesPersonHistory from './SalesPersonHistory';
import SalesPersonList from './SalesPersonList';
import SaleList from './SaleList';
import SaleForm from './SaleForm';
import TechniciansForm from './TechnicianForm';
import TechniciansList from './Technicians';
import HistoryList from './ServiceHistory';
import AppointmentForm from './AppointmentForm';
import ManufacturersList from './ManufacturerList';
import CreateManufacturer from './ManufacturerForm';
import AppointmentsList from './AppointmentList';
import CustomersList from './CustomersList';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="Sales/*">
            <Route path="customers/create" element={<CustomerForm />} />
            <Route path="customers/list" element={<CustomersList />} />
            <Route path="salespeople/history" element={<SalesPersonHistory />} />
            <Route path="salespeople/create" element={<SalesPersonForm />} />
            <Route path="salespeople/list" element={<SalesPersonList />} />
            <Route path="sales/all" element={<SaleList />} />
            <Route path="form" element={<SaleForm />} />
            <Route path="automobiles/create" element={<AutomobileForm />} />
            <Route path="automobiles/list" element={<AutomobileList />} />
          </Route>

          <Route path="Services/*">
            <Route path='technicians/new' element={<TechniciansForm/>} />
            <Route path='technicians/list' element={<TechniciansList/>}/>
            <Route path='manufacturs/list' element={<ManufacturersList/>}/>
            <Route path='create/manufacturs' element={<CreateManufacturer/>}/>
            <Route path='service/history' element={<HistoryList/>}/>
            <Route path='create/service/appointments' element={<AppointmentForm/>}/>
            <Route path='service/appointments' element={<AppointmentsList/>}/>
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
