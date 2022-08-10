import React, { useState, useEffect } from 'react';
import constants from '../constants';


export default function Register() {
    const [formData, setFormData] = React.useState(
        {
            username: '',
            password: '',
            confirmPassword: ''
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
                    const res = await fetch(`${constants.API_BASE_URL}register`, reqOptions);
                    const data = await res.json();
                    setAuthorized(res.ok ? true : false);
                    setFormData(prevFormData => {
                        if (res.ok)
                            return (
                                {
                                    username: '',
                                    password: '',
                                    confirmPassword: ''
                                }
                            )
                        else return (
                            prevFormData
                        )
                    })
                } catch (error) {
                    console.log(error);
                }


            })();
        }
    }, [isSubmitted]);

    function handleChange(event) {
        document.querySelector('#confirmPass').setCustomValidity("");
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
        event.preventDefault();

        setIsSubmitted(true);

    }

    function passValidation() {
        if (formData.password !== formData.confirmPassword) {
            document.querySelector('#confirmPass').setCustomValidity("Your Passwords don't much");
        } else {
            // document.querySelector('#confirmPass').setCustomValidity("");
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="text-center d-flex flex-column">
                <h5 className="mb-3">Don't have user yet? Sign-Up</h5>
                <div className="mb-3  mx-auto">
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
                <div className="mb-3  mx-auto">
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
                <div className="mb-3 mx-auto">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        required
                        className="form-control"
                        id="confirmPass"
                    />
                </div>
                {authorized && <p className="lh-1  py-1 text-success"> Successfully registered! now you can Login.</p>}
                <button className="btn auth-btn mt-auto mx-auto mb-3" onClick={passValidation}>Sign-Up</button>
            </form>
        </div>

    )
}