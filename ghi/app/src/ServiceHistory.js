import React, { useState, useEffect } from "react";

function HistoryList() {
    const [appointments, setAppointments] = useState([]);
    const [searchVin, setSearchVin] = useState("");

const getDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric"})
    return formattedDate
}

const getTime = (timeString) => {
    const time = new Date(timeString);
    const formattedtime = time.toLocaleTimeString('en-us', {hour:"numeric", minute:"numeric", second:"numeric", hour12:true})
    return formattedtime
}

const handleSearch = async () => {
    const url = 'http://localhost:8080/api/appointments';
    try{
        const response = await fetch(url);
        if (response.ok){
        const data = await response.json();
        let filteredAppointments = data.appointments;
        if (searchVin !== "") {
            filteredAppointments = filteredAppointments.filter((appointment) =>
            appointment.vin.startsWith(searchVin)
            );
        }
        setAppointments(filteredAppointments);
    }
} catch (e) {
        console.error(e);
    }
}

useEffect(() => {
    const fetchData = async () => {
    const url = 'http://localhost:8080/api/appointments';
    const vinurl = 'http://localhost:8080/api/vin/';
    try{
        const response = await fetch(url);
        if (response.ok){
        const data = await response.json();
        const vinresponse = await fetch(vinurl);
        if (vinresponse.ok){
            const vinData = await vinresponse.json();
            let vipVin = []
            vinData.autos.map(auto => {
            vipVin.push(auto.vin)
            });
            data.appointments.map(appointment => {
                if (vipVin.includes(appointment.vin)) {
                appointment.vip = true;
            }
            })
            setAppointments(data.appointments)
        }
        }
    } catch (e) {
        console.error(e);
    }
    }
    fetchData();
}, []);

return (
    <>
    <h1>Service History</h1>
    <div>
        <input type="text" placeholder="Search by VIN" value={searchVin} onChange={(e) => setSearchVin(e.target.value)}></input>
        <div className="input-group-append">
        <button onClick={() => handleSearch()} className="btn btn-outline-secondary" type="button">Search</button>
        </div>
    </div>
    <table className="table table-striped table-hover">
        <thead className="table border-dark">
        <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Custamer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {appointments.map((appointment) => (
            <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.vip ? "YES" : "NO"}</td>
                <td>{appointment.customer}</td>
                <td>{getDate(appointment.date_time)}</td>
                <td>{getTime(appointment.date_time)}</td>
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
