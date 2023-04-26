import React, { useState } from 'react';

function TechniciansForm({ handleAddTechnician }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/technicians',{
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                employeeId,
            })

        });
        const data = await response.json();
        handleAddTechnician(data);
        setFirstName("");
        setLastName("");
        setEmployeeId("");
    };

return (
    <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a new Technician</h1>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Name" className="form-control" />
                        <label htmlFor="name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Name" className="form-control" />
                        <label htmlFor="name">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Name" className="form-control" />
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
