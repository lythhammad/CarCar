import React, {useEffect, useState} from "react";

function AutomobileList() {
    const [autos, setAutos] = useState([]);

    const fetchData = async () => {
        const autoURL = "http://localhost:8100/api/automobiles/";

        try {
            const response = await fetch(autoURL);
            if (response.ok) {
                const data = await response.json();
                setAutos(data.autos);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function convertBool(boolean) {
        if (boolean == true) {
            return (
                <td>yes</td>
            );
        }
        return (
            <td>no</td>
        );
    }

    return (
        <>
          <h3 className="mt-5">Automobiles</h3>
          <table className="table table-striped table-hover">
            <thead className="table border-dark">
              <tr>
                <th>Vin</th>
                <th>Color</th>
                <th>Year</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Sold</th>
              </tr>
            </thead>
            <tbody>
              {autos.map(auto => {
                return (
                  <tr key={ auto.href}>
                    <td>{ auto.vin }</td>
                    <td>{ auto.color }</td>
                    <td>{ auto.year}</td>
                    <td>{ auto.model.name }</td>
                    <td>{ auto.model.manufacturer.name }</td>
                    { convertBool(auto.sold) }
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      );
 }

 export default AutomobileList;
