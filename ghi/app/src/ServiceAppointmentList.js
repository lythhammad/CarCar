import React, { useState, useEffect } from "react";

function ServiceAppointments() {
const [appointments, setAppointmens] = useState([]);

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


return (
    <>
    <h1>Service Appointments</h1>
    <table className="table table-striped table-hover">
        <thead className="table border-dark">
        <tr>
            <th>VIN</th>
            <th>Custamer</th>
            <th>Date</th>
            <th>Technician</th>
            <th>Reason</th>
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

export default ServiceAppointments;
