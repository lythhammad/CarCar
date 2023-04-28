import React, { useState } from 'react';

function TechniciansForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const technicianUrl = "http://localhost:8080/api/technicians";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify( data ),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            setFirstName("");
            setLastName("");
            setEmployeeId("");
        }
    };

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleEmployeeIDChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }


return (
    <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a new Technician</h1>
                <form onSubmit={handleSubmit} id="creat-location-form">
                    <div className="form-floating mb-3">
                        <input onChange= {handleFirstNameChange} value={firstName} placeholder="firstName" required type='text' name='firstName' id='firstName' className="form-control" />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} value={lastName} placeholder="lastName" type='text' name='lastName' id='lastName' className="form-control" />
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleEmployeeIDChange} value={employeeId} placeholder="employeeId" required type='number' name='employeeId' id='employeeId' className="form-control" />
                        <label htmlFor="employeeId">Employee Id</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Create a Technician</button>
                </form>
                </div>
            </div>
        </div>
    </>
)
}


export default TechniciansForm;
