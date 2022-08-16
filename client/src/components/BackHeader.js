import React, { useState, useEffect } from 'react';

export default function BackHeader() {

    return (
        <div className='back-header px-2 d-flex justify-content-between align-items-center text-white'>
            <h1 className="site-name  m-0">Football Favorites</h1>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle about-dropdown-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    About
                </button>
                <div className="dropdown-menu p-3 text-muted text-center about-dropdown" >
                    <p>

                        All data in this site is retrieved from <a href="https://www.thesportsdb.com/">TheSportsDB</a>  API.
                        It has free access and the content is maintained and updated by TheSportsDB users,
                        which may cause data sometimes to be uneven or not up to date .
                    </p>
                </div>
            </div>
        </div>
    )
}

