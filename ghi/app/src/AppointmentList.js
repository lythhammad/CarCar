import React, { useState, useEffect } from "react";

function AppointmentsList() {
const [appointments, setAppointmens] = useState([]);

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


const handleCancelAppointment = async (appointmentId) => {
    const url = `http://localhost:8080/api/appointments/${appointmentId}/cancel`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            appointments.map(appointment =>{
                if (appointment.id == appointmentId) {
                    appointment.status = "canceled"
                }
            })
            setAppointmens([...appointments]);
        } else {
            console.error("Failed to cancel appointment");
        }
    } catch (e) {
        console.error(e)
    }
}

const handleFinishAppointment = async (appointmentId) => {
    const url = `http://localhost:8080/api/appointments/${appointmentId}/finish`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            appointments.map(appointment =>{
                if (appointment.id == appointmentId) {
                    appointment.status = "finished"
                }
            })
            setAppointmens([...appointments]);
        } else {
            console.error("Failed to finish appointment");
        }
    } catch (e) {
        console.error(e)
    }
}


useEffect(()=>{
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments';
        console.log(url)
        try{
            const response = await fetch(url);
            if (response.ok){
                const data = await response.json();
                setAppointmens(data.appointments)
            }
        } catch (e) {
            console.error(e);
        }
    }
    fetchData();
    console.log(fetchData)
}, []);



return (
    <>
    <h1>Service Appointments</h1>
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
        </tr>
        </thead>
        <tbody>
            <tr key={appointments.id}>
                <td>{appointments.vin}</td>
                <td>{appointments.Vip ? "YES" : "NO"}</td>
                <td>{appointments.customer}</td>
                <td>{getDate(appointments.date_time)}</td>
                <td>{getTime(appointments.date_time)}</td>
                {/* <td>{`${appointments.technician.first_name} ${appointments.technician.last_name}`}</td> */}
                <td>{appointments.reason}</td>
                <td>
                    <button className="btn-danger me-2" onClick={() => handleCancelAppointment(appointments.id)}>Cancel</button>
                    <button className="btn-success me-2" onClick={() => handleFinishAppointment(appointments.id)}>Finished</button>
                </td>
            </tr>
        </tbody>
    </table>
    </>
);
}

export default AppointmentsList;
