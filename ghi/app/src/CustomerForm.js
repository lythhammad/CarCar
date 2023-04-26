import React, { useState, useEffect } from 'react';

export default function CustomerForm()  {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.address = address;
        data.phone_number = phoneNumber

        console.log(data);

        const customerURL = "http://localhost:8090/api/customers";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(customerURL, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);

            setName('');
            setAddress('');
            setPhoneNumber('');
            fetchCustomers();
        }
    };

    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    const [address, setAddress] = useState('');
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    };

    const [phoneNumber, setPhoneNumber] = useState("");
    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    };

    const [customers, setCustomers] = useState([]);
    const fetchCustomers = async () => {
        const customerURL = "http://localhost:8090/api/customers";
        const response = await fetch(customerURL);

        if (response.ok) {
            const customersData = await response.json();
            setCustomers(customersData.customer)
        }
    };
    useEffect(() => {
        fetchCustomers();
    },[]);

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a new customer</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleAddressChange} value={address} placeholder="Address" required type="text" name="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePhoneNumberChange} value={phoneNumber} placeholder="Phone Number" required type="text" name="phone_number" className="form-control" />
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Customer</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
