import React, { useState } from "react";

function CreateManufacturer() {
const [name, setName] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8100/api/manufacturers", {
        method: "post",
        haders: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    if (response.ok) {
        setName("");
    }
};

// useEffect(() => {
//     getData();
// }, []);


return (
    <>
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h2>Creat A Manufacturers</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    </>
    );
}

export default CreateManufacturer;


// const getData = async (e) => {
//     const response = await fetch("http://localhost:8100/api/manufacturers");
//     if (response.ok) {
//     const data = await response.json();
//     setManufacturers(data.manufacturers);
//     }
// };
// return (
//     <>
//     <h1>Creat A Manufacturers</h1>
//     <table className="table table-striped table-hover">
//         <thead className="table border-dark">
//         <tr>
//             <th>Name</th>
//         </tr>
//         </thead>
//         <tbody>
//         {manufacturers.map((manufacturer) => (
//         <tr key={manufacturer.id}>
//             <td>{manufacturer.name}</td>
//         </tr>
//         ))}
//         </tbody>
//     </table>
//     </>
// );
