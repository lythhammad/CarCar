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
                if (appointment.id === appointmentId) {
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
                if (appointment.id === appointmentId) {
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
            {appointments.map((appointment) =>(
                <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>{appointment.Vip ? "YES" : "NO"}</td>
                    <td>{appointment.customer}</td>
                    <td>{getDate(appointment.date_time)}</td>
                    <td>{getTime(appointment.date_time)}</td>

                    <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>

                    <td>{appointment.reason}</td>
                    <td>
                        <button className="btn-danger me-2" onClick={() => handleCancelAppointment(appointment.id)}>Cancel</button>
                        <button className="btn-success me-2" onClick={() => handleFinishAppointment(appointment.id)}>Finished</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
);
}

export default AppointmentsList;
