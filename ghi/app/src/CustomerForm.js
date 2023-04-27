import React, { useState, useEffect } from 'react';

function CustomerForm() {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber

        console.log(data);

        const customerURL = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

    const response = await fetch(customerURL, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();


            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
            fetchCustomers();

            console.log(newCustomer);
        }
    };

    const [firstName, setFirstName] = useState('');
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    };
    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
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

        const customerURL = "http://localhost:8090/api/customers/";

        const response = await fetch(customerURL);

        if (response.ok) {
            const customersData = await response.json();
            setCustomers(customersData.customer)

            console.log(customers, setCustomers);
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
                        <h1>Add a new Customer</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" name="first_name" className="form-control" />
                                <label htmlFor="first_name">First Name</label>
                            <div className="form-floating mb-3">
                                <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" name="last_name" className="form-control" />
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleAddressChange} value={address} placeholder="Address" required type="text" name="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePhoneNumberChange} value={phoneNumber} placeholder="Phone Number" required type="text" name="phone_number" className="form-control" />
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CustomerForm;
