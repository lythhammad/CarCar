import React, { useState } from 'react';

function CustomerForm() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
            address,
            phone_number: phonenumber,
        }

        const url = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }

        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                const newCustomer = await response.json();
                setName("");
                setAddress("");
                setPhoneNumber("");
            }
        }
    }
}
    }
}
}
