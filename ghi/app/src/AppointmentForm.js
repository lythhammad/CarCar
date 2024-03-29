import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);
    const [vin, setVin] = useState("");
    const [customer, setCustomer] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [technician, setTechnician] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        let datetime = new Date(date)
        let hour_minute = time.split(":")
        datetime.setHours(hour_minute[0])
        datetime.setMinutes(hour_minute[1])

        data.vin = vin;
        data.customer = customer;
        data.date_time = date;
        data.technician = technician;
        data.reason = reason;

        const AppointmentUrl = "http://localhost:8080/api/appointments";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify( data ),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(AppointmentUrl, fetchConfig);
        if (response.ok) {
            const data = await response.json()
            setVin("");
            setCustomer("");
            setDate("");
            setTime("");
            setTechnician("");
            setReason("");
        }
    };

    const handleVivChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }

    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    useEffect(() =>{
        const fetchData = async () => {
            const technicianurl = "http://localhost:8080/api/technicians";
            const response = await fetch(technicianurl);

            if (response.ok){
                const data = await response.json();
                setTechnicians(data.technicians)
            }
        }
        fetchData();
    }, []);


return (
    <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create A Service Appointment</h1>
                <form onSubmit={handleSubmit} id="creat-location-form">
                    <div className="form-floating mb-3">
                        <input onChange= {handleVivChange} value={vin} placeholder="vin" required type='text' name='vin' id='vin' className="form-control" />
                        <label htmlFor="vin">Vin</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange= {handleCustomerChange} value={customer} placeholder="customer" required type='text' name='customer' id='customer' className="form-control" />
                        <label htmlFor="customer">Customer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange= {handleDateChange} value={date} placeholder="date" required type='date' name='date' id='date' className="form-control" />
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange= {handleTimeChange} value={time} placeholder="time" required type='time' name='time' id='time' className="form-control" />
                        <label htmlFor="time">Time</label>
                    </div>

                    <div className="form-floating mb-3">
                        <select onChange= {handleTechnicianChange} value={technician} placeholder="technicians" required type='text' name='technicians' id='technicians' className="form-control">
                        <option htmlFor="technicians">Technicians</option>
                        {
                            technicians.map(technician => {
                                return (
                                    <option key={technician.id} value={technician.id}>
                                        {technician.first_name} {technician.last_name}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange= {handleReasonChange} value={reason} placeholder="reason" required type='text' name='reason' id='reason' className="form-control" />
                        <label htmlFor="reason">Reason</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    </>
)
}


export default AppointmentForm;
