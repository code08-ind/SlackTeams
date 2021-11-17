import React from 'react';

const Footer = () => {
    return (
        <>
            <footer id="foot">
                <div className="container one">
                    <h1 className="title">IMAGINE A PLACE</h1>
                    <div className="rows">
                        <a href="https://github.com/code08-ind"><i class="fab fa-facebook"></i></a>
                        <a href="https://github.com/code08-ind"><i class="fab fa-github"></i></a>
                        <a href="https://www.instagram.com/aryan_garg_08/"><i class="fab fa-instagram"></i></a>
                        <a href="https://twitter.com/AryanGa66087243"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                <hr />
                <div className="container two">
                    <a className="footname" href="/">
                        <img src="https://i.ibb.co/8sSF8Dp/icon.png" width="40px" height="40px" alt="SlackTeams" className="mr-2" />
                        <span>SlackTeams</span>
                    </a>
                    <a href="https://slackteamsvc.netlify.app">
                        <button className="btns">Open SlackTeams</button>
                    </a>
                </div>
                <p className="copy">Created By @Aryan Garg &copy; 2021</p>
            </footer>
        </>
    );
}

export default Footer;
