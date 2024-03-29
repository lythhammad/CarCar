import React, { useState } from "react";


function CreateManufacturer() {
const [name, setName] = useState('');
const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;

    const manufacturersurl = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify( data ),
        headers: { "Content-Type": "application/json",
        },
    };
    const response = await fetch(manufacturersurl, fetchConfig);

    if (response.ok) {
        setName("");
    }
};

const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
}

return (
    <>
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h2>Creat A Manufacturers</h2>
                <form onSubmit={handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleNameChange} value={name} placeholder="Manufacturers Name" type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Manufacturers Name</label>
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
