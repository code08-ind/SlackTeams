import React from 'react';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/">
                    <img src="https://i.ibb.co/8sSF8Dp/icon.png" width="40px" height="40px" alt="SlackTeams" className="mr-2" />
                    SlackTeams
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="#about">About</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="#features">Features</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="#reliability">Reliability</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="#foot">More About Us</a>
                        </li>
                    </ul>
                </div>

                <div className="goto">
                    <a href="https://slackteamsvc.netlify.app">
                        <button className="btns">Go To SlackTeams</button>
                    </a>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
