import React, { useState, useEffect} from "react";
import TechniciansForm from "./Technicians";


function TechniciansList() {
    const [technicians, setTechnicians] = useState([]);

    const fetchTechnicians = async () => {
        const response = await fetch("http://localhost:8080/api/technicians");
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data);
        }
    };

    useEffect(() => {
        fetchTechnicians();
    }, []);


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{technicians.employee_id}</td>
                    <td>{technicians.first_name}</td>
                    <td>{technicians.last_name}</td>
                </tr>
                </tbody>
        </table>
    );
}
export default TechniciansList;
