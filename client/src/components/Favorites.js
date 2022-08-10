import React, { useState, useEffect, useContext } from 'react';
import constants from '../constants';
import UserContext from './context/UserProvider';


export default function Favorites() {
    const { setUser } = useContext(UserContext)

    const handleLogout = () => {
        setUser(constants.DEFAULT_USER);
        localStorage.removeItem('user');
    }

    return (
        <div className="text-center">
            <div className="d-flex mb-3 justify-content-center rounded justify-content-center align-items-center">
                <div className="user-guide ">
                    <h1>Welcome!</h1>

                    <p className=" fw-bold me-2">
                        Here you can edit and choose your favorites leagues! <br />
                        <span className="color-font"> First:</span> Select or search for country. <br />
                        <span className="color-font">Second:</span> Add leagues from result. <br />
                        Done!
                    </p>
                </div>
                <div className="fav-leagues rounded text-white">
                    <h5 className="border-bottom border-2">Favorites Leagues</h5>
                    <div className="border-bottom border-2 d-flex justify-content-around">
                        <span> Favorites Leagues</span>
                        <select data-live-search="true" className="selectpicker">
                            <option value="4444">4444</option>
                            <option value="Fedex">Fedex</option>
                            <option value="Elite">Elite</option>
                            <option value="Interp">Interp</option>
                            <option value="Test">Test</option>
                        </select>
                        <select name="" id=""></select>

                        {/* <select class="selectpicker" data-live-search="true">
                        <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
                        <option data-tokens="mustard">Burger, Shake and a Smile</option>
                        <option data-tokens="frosting">Sugar, Spice and all things nice</option>
                    </select> */}
                    </div>
                </div>
            </div>
            <button onClick={handleLogout} className="btn auth-btn mb-3 ">Logout</button>
        </div>
    )
}