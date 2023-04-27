import React, {useEffect, useState} from 'react';

function SaleForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState(0);

    const fetchData = async () => {
        const automobilesURL = "http://localhost:8100/api/automobiles/";
        const automobilesResponse = await fetch(automobilesURL)
        if(automobilesResponse.ok) {
            const forSaleAutos = [];
            const allAutos = await automobilesResponse.json();
            for (let auto of allAutos.automobiles) {
                if (auto.sold === false) {
                    forSaleAutos.push(auto);
                }
            }
            setAutomobiles(forSaleAutos);
        }

        const salespeopleURL = "http://localhost:8090/api/salespeople/"
        const salespeopleResponse = await fetch(salespeopleURL);
        if (salespeopleResponse.ok) {
            const data = await salespeopleResponse.json();
            setSalespeople(data.salespeople);
        }

        const customersURL = "http://localhost:8090/api/customers/"
        const customersResponse = await fetch(customersURL);
        if (customersResponse.ok) {
            const data = await customersResponse.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;

        const salesURL = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json",
            }
        };

        const response = await fetch(salesURL, fetchConfig);
        if (response.ok) {
            const autoData = {};
            autoData.vin = automobile;
            const automobileURL = "http://localhost:8100/api/automobiles/";
            const fetchAutomobileConfig = {
                method: "put",
                body: JSON.stringify(autoData),
                headers: {
                    "Content-Type": "application/json",
                }
            };

            const autoResponse = await fetch(automobileURL, fetchAutomobileConfig);
            if (autoResponse.ok) {
                setAutomobile('');
                setSalesperson('');
                setCustomer('');
                setPrice('');
                fetchData();
            }
        }
    }

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.taget.value;
        setCustomer(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="automobile">Automobile VIN:</label>
          <select id="automobile" name="automobile" onChange={handleAutomobileChange}>
            <option value="">Choose an automobile VIN</option>
            {automobiles.map((automobile) => (
              <option key={automobile.vin} value={automobile.vin}>
                {automobile.vin}
              </option>
            ))}
          </select>
          <br />
          <br />
          <label htmlFor="salesperson">Salesperson:</label>
          <select id="salesperson" name="salesperson" onChange={handleSalespersonChange}>
            <option value="">Choose a salesperson</option>
            {salespeople.map((salesperson) => (
              <option key={salesperson.employee_id} value={salesperson.employee_id}>
                {`${salesperson.first_name} ${salesperson.last_name} ${salesperson.employee_id}`}
              </option>
            ))}
          </select>
          <br />
          <br />
          <label htmlFor="customer">Customer:</label>
          <select id="customer" name="customer" onChange={handleCustomerChange}>
            <option value="">Choose a customer</option>
            {customers.map((customer) => (
              <option key={customer.phone_number} value={customer.phone_number}>
                {`${customer.first_name} ${customer.last_name} ${customer.phone_number}`}
              </option>
            ))}
          </select>
          <br />
          <br />
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" value={price} onChange={handlePriceChange} required />
          <br />
          <br />
          <button type="submit">Create</button>
        </form>
      );

}

export default SaleForm;
