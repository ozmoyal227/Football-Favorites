import React, { useState, useEffect, useContext } from 'react';
import constants from '../constants';
import UserContext from './context/UserProvider'

export default function Login() {
    const { user, setUser } = useContext(UserContext);

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
                    if (data) {
                        await localStorage.setItem('user', JSON.stringify(data));
                        setAuthorized(res.ok ? true : false);
                        setUser(data);
                    }

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
        <div className="container-fluid d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="text-center d-flex flex-column">
                <h5 className="mb-3">Login and see your preferred leagues and teams</h5>
                {authorized && <p> you are authorized</p>}
                <div className="mb-3 mx-auto">
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

                <button className="btn auth-btn mt-auto mx-auto mb-3">Login</button>

            </form>
        </div>
    )
}