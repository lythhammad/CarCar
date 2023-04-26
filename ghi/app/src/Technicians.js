import React, { useState, useEffect} from "react";
import TechniciansForm from "./Technicians";


function App() {
    const [technicians, setTechnicians] = useState([]);

    const handleAddTechnician = (technician) => {
        setTechnicians([...technicians, technician]);
    };


    return (
        <div>
            <h2>Technicians</h2>
            <ul>
                {technicians.map((technician) =>(
                    <li key={technician.id}>
                        {technician.employeeId} {technician.firstName} {technician.lastName}
                    </li>
                ))}
            </ul>
            <TechniciansForm handleAddTechnician={handleAddTechnician} />
        </div>
    );
}
export default App;
