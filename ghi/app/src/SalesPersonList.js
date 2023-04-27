import React, { useEffect, useState } from 'react';

function SalesPersonList() {
  const [salespeople, setSalesPeople] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8090/api/salespeople/";

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSalesPeople(data.salespeople);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h3 className="mt-5">Salespeople</h3>
      <table className="table table-striped table-hover">
        <thead className="table border-dark">
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {salespeople.map(person => {
            return (
              <tr key={person.id}>
                <td>{person.employee_id}</td>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalesPersonList;
