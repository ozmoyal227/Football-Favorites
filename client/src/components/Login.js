import React, { useState, useEffect } from 'react';
import constants from '../constants';


export default function Login() {
    const [formData, setFormData] = React.useState(
        {
            username: '',
            password: ''
        }
    )
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [authorized, setAuthorized] = useState(false);


    // in req that needed to be authorized for nedd to add to the headers: 'Authorization': `Bearer ${here to put token}`,
    useEffect(() => {
        if (isSubmitted) {
            (async () => {
                try {
                    const user = {
                        username: `${formData.username}`,
                        password: `${formData.password}`,
                    }
                    const reqOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(user)
                    };
                    const res = await fetch(`${constants.API_BASE_URL}login`, reqOptions);
                    const data = await res.json();
                    setAuthorized(res.ok ? true : false);
                } catch (error) {
                    console.log(error);
                }


            })();
        }
    }, [isSubmitted]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
        setIsSubmitted(false);
    };

    function handleSubmit(event) {
        event.preventDefault()
        // submitToApi(formData)
        setIsSubmitted(true);
    }
    return (
        <div className="container text-center">
            <h5 className="mb-3">Login and see your preferred leagues and teams</h5>
            <p>{!authorized ? "you are not authorized" : "you are authorized"}</p>

            <form onSubmit={handleSubmit} className=" text-center px-4">
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={handleChange}
                        name="username"
                        value={formData.username}
                        required
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                        required
                        className="form-control"
                    />
                </div>

                <button className="btn btn-primary">Login</button>

            </form>
        </div>
    )
}