import React, { useState, useEffect } from "react";

function HistoryList() {
const [appointments, setAppointmens] = useState([]);
const [vin, setVin] = useState("");

const getDate = (dateSring) => {
    const date = new Date(dateSring);
    const formattedDate = date.toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric"})
    return formattedDate
}

const getTime = (timeSring) => {
    const time = new Date(timeSring);
    const formattedtime = time.toLocaleTimeString('en-us', {hour:"numeric", minute:"numeric", second:"numeric", hour12:true})
    return formattedtime
}

const handleSearch = async () => {
    const url = "http://localhost:8080/api/appointments";
    try{
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setAppointmens(data.appointments)
        }
    } catch (e) {
        console.error(e);
    }
    if (vin !== "") {
        const filteredAppointments = appointments.filter(appointment => appointment.vin.startWith(vin));
        setAppointmens(filteredAppointments)
    }
}


const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value)
}


useEffect(()=>{
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
                    setAppointmens(data.appointments)
                }
            }
        } catch (e) {
            console.error(e);
            console.log(e)
        }
    }
    fetchData();
}, []);


return (
    <>
    <h1>Service History</h1>
    <div>
        <input type="text" placeholder="Search by VIN" value={vin} onChange={(e) => setVin(e.target.value)}></input>
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
            {appointments.map(appointment => {
                if (appointment.status === 'created') {
                    return (
                    <tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>{appointment.Vip ? "YES" : "NO"}</td>
                        <td>{appointment.customer}</td>
                        <td>{getDate(appointment.date_time)}</td>
                        <td>{getTime(appointment.date_time)}</td>
                        <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.status}</td>
                    </tr>
                    )
                }
            })}
        </tbody>
    </table>
    </>
);
}

export default HistoryList;
