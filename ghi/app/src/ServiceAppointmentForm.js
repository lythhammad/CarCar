import React, { useState } from 'react';

function ServiceAppointmentForm() {
    const [vin, setVin] = useState("");
    const [customer, setCustomer] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [technician, setTechnician] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.vin = vin;
        data.customer = customer;
        data.date = date;
        data.time = time;
        data.technician = technician;
        data.reason = reason;

        const serviceAppointmentUrl = "http://localhost:8080/api/appointments";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify( data ),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(serviceAppointmentUrl, fetchConfig);
        if (response.ok) {
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


return (
    <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a new Technician</h1>
                <form onSubmit={handleSubmit} id="creat-location-form">
                    <div className="form-floating mb-3">
                        <input onChange= {handleVivChange} value={vin} placeholder="vin" required type='text' name='vin' id='vin' className="form-control" />
                        <label htmlFor="vin"></label>
                    </div>
                    {/* <div className="form-floating mb-3">
                        <input onChange= {} value={} placeholder="" required type='text' name='' id='' className="form-control" />
                        <label htmlFor=""></label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange= {} value={} placeholder="" required type='text' name='' id='' className="form-control" />
                        <label htmlFor=""></label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange= {} value={} placeholder="" required type='text' name='' id='' className="form-control" />
                        <label htmlFor=""></label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange= {} value={} placeholder="" required type='text' name='' id='' className="form-control" />
                        <label htmlFor=""></label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange= {} value={} placeholder="" required type='text' name='' id='' className="form-control" />
                        <label htmlFor=""></label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    </>
)
}


export default ServiceAppointmentForm;
