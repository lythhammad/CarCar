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
    <form>
        <div>
            <label>
                Employee Id:
                <input type='text' value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
            </label>
        </div>
        <div>
            <label>
                First Name:
                <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
        </div>
        <div>
            <label>
                Last Name:
                <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
        </div>
        <button type='submit'>Create Technician</button>
    </form>
)
}


export default TechniciansForm;
