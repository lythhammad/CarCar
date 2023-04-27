import React, {useEffect, useState} from "react";


function SalesPersonHistory() {
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [salesperson, setSalesperson] = useState('');

  const fetchData = async (value) => {
    const salesUrl = "http://localhost:8090/api/sales/";
    const salespeopleUrl = "http://localhost:8090/api/salespeople/";

    try {
      const salesResponse = await fetch(salesUrl);
      if (salesResponse.ok) {
        const data = await salesResponse.json();
        const filteredSales = [];
        for (let sale of data.sales) {
            if (sale.salesperson.employee_id === value) {
                filteredSales.push(sale);
            }
        }
        setSales(filteredSales);
      }
    } catch (e) {
      console.error(e);
    }
    try {
      const salespeopleResponse = await fetch(salespeopleUrl);
      if (salespeopleResponse.ok) {
        const data = await salespeopleResponse.json();
        setSalespeople(data.salespeople);
      }
    } catch (e) {
      console.error(e);
    }
  }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
        fetchData(value);
    }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <h1 style={{ marginTop: "15px" }}>Salesperson History</h1>
        <div className="mb-3">
            <select onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose an salesperson</option>
                {salespeople.map(salesperson => {
                    return (
                    <option key={salesperson.employee_id} value={salesperson.employee_id}>
                        {`${salesperson.first_name} ${salesperson.last_name} ${salesperson.employee_id}`}
                    </option>
                    );
                })}
            </select>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson Employee ID</th>
                    <th>Salesperson Name</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    return (
                        <tr key={ sale.href }>
                            <td>{ sale.salesperson.employee_id }</td>
                            <td>{ `${sale.salesperson.first_name} ${sale.salesperson.last_name}` }</td>
                            <td>{ `${sale.customer.first_name} ${sale.customer.last_name}` }</td>
                            <td>{ sale.automobile.vin }</td>
                            <td>{ `$${sale.price}` }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  );
}

export default SalesPersonHistory;
