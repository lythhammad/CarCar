import React, { useState } from 'react';

function TechniciansForm({ handleAddTechnician }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.first_name = firstName;
        data.last_name = lastName
        data.employee_id = employeeId

        const TechnicianUrl = "http://localhost:8080/api/technicians";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            Headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(TechnicianUrl, fetchConfig);
        if (response.ok) {
            const success = document.getElementById("success");
            success.className = "text-center";
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
        setFirstName(value);
    }


return (
    <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a new Technician</h1>

                <form onSubmit={handleSubmit} id="creat-location-form">

                    <div className="form-floating mb-3">
                        <input type="text" value={firstName} onChange= {handleFirstNameChange} placeholder="Name" className="form-control" />
                        <label htmlFor="name">First Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" value={lastName} onChange={handleLastNameChange} placeholder="Name" className="form-control" />
                        <label htmlFor="name">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" value={employeeId} onChange={handleEmployeeIDChange} placeholder="Name" className="form-control" />
                        <label htmlFor="name">Employee Id</label>
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

// const response = await fetch('http://localhost:8080/api/technicians',{
//             method: "POST",
//             headers: {
//                 'content-type': "application/json"
//             },
//             body: JSON.stringify({
//                 firstName,
//                 lastName,
//                 employeeId,
//             })

//         });
