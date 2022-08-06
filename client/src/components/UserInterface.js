import React, { useState, useEffect } from 'react';

export default function User() {
    const [formData, setFormData] = React.useState(
        {
            username: "",
        }
    )

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    };



    function handleSubmit(event) {

        event.preventDefault()

        // submitToApi(formData)

        console.log(formData)

    }



    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Username"
                onChange={handleChange}
                name="username"
                value={formData.username}
            />
            <button>Submit</button>
        </form>

    )


}