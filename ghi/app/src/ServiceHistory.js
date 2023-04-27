import React, { useState, useEffect } from "react";

function HistoryList() {
const [appointments, setAppointmens] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

const getData = async () => {
    const response = await fetch("http://localhost:8080/api/appointments");
    if (response.ok) {
    const data = await response.json();
    setAppointmens(data.appointments);
    }
};

useEffect(() => {
    getData();
}, []);

const filteredAppointments = appointments.filter((appointment) => {
    const vin = appointment.vin.toLowerCase();
    return vin.includes(searchTerm.toLowerCase());
});
return (
    <>
    <h1>Service History</h1>
    <div>
        <input type="text" placeholder="Search by VIN" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
    </div>
    <table className="table table-striped table-hover">
        <thead className="table border-dark">
        <tr>
            <th>VIN</th>
            <th>Custamer</th>
            <th>Date</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {appointments.map((appointment) => (
            <tr key={appointment.id}>
            <td>{appointment.vin}</td>
            <td>{appointment.customer}</td>
            <td>{appointment.date_time}</td>
            <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
            <td>{appointment.reason}</td>
            <td>{appointment.status}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </>
);
}

export default HistoryList;
