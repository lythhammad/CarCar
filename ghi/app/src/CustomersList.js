import React, {useEffect, useState} from "react";

function CustomersList() {
    const [customers, setCustomers] = useState([]);

    const fetchData = async () => {
        const CustomersURL = "http://localhost:8090/api/customers/";

        try {
            const response = await fetch(CustomersURL);
            if (response.ok) {
                const data = await response.json();
                setCustomers(data.customers);
            }
        }   catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div>
            <h1 style = {{ marginTop: "20px"}}>Customers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => {
                        return (
                            <tr key={ customer.href}>
                                <td>{ customer.first_name }</td>
                                <td>{ customer.last_name }</td>
                                <td>{ customer.phone_number }</td>
                                <td>{ customer.address }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CustomersList;
