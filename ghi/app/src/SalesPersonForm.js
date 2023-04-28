import React, { useState } from 'react';

function SalesPersonForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
    };

    const response = await fetch('http://localhost:8090/api/salespeople/',{
        method: "POST",
        headers: {
            'content-type': "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
      setFirstName("");
      setLastName("");
      setEmployeeId("");
    }
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Sales Person</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Name"
                  className="form-control"
                />
                <label htmlFor="name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Name"
                  className="form-control"
                />
                <label htmlFor="name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Name"
                  className="form-control"
                />
                <label htmlFor="name">Employee Id</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Create a Sales Person
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesPersonForm;
