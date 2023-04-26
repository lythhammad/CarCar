import React, {useEffect, useState} from 'react';

function SalesPersonHistory({sales}) {

    const[salesPerson, setSalesPerson] = useState("");
    const handleSalesPerson = (event) =>{
        const value = event.target.value;
        setSalesPerson(value);
    }

    const [salesPeople, setSalesPeople] = useState([]);
    const fetchSalesPeople = async () => {

        const salesPeopleURL = "http://localhost:8090/api/salespeople/";

        const response = await fetch(salesPeopleURL);

        if (response.ok) {
            const salesPeopleData = await response.json();
            setSalesPeople(salesPeopleData.sales_people)
        }
    }

    useEffect(() => {
        fetchSalesPeople();
    }, []);

    const filteredSales = sales.filter(sale => salesPerson === '' || sale.sales_person.name === salesPerson);

    return (
        <div className="mt-4">
            <h1>Salesperson History</h1>
            <form className='mb-3'>
                <select className="form-select" value={salesPerson} onChange={handleSalesPerson}>
                    <option value="">Filter by sales person</option>
                    <option value="All">All</option>
                    {salesPeople.map((person, index) => <option key={index} value={person.name}>{person.name}</option>)}
                </select>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sales Person</th>
                        <th>Customer</th>
                        <th>Vin</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map((sale, index) => {
                        return (
                            <tr key={index}>
                                <td>{sales.sales._person.name}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.name}</td>
                                <td>${sale.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}
export default SalesPersonHistory;
