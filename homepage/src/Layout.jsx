import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Design from './images/design.png';

const Layout = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            delay: 500
        });
    });
    return (
        <>
            <section className="layout">
                <div className="container" data-aos="fade-up">
                    <h1 className="heading">Reliable Tech For Staying Close</h1>
                    <p>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</p>
                    <img src={Design} alt="Layout Of SlackTeams" />
                    <div className="more" data-aos="fade-up">
                        <h1>
                            Ready to start your journey?
                        </h1>
                        <a href="https://slackteamsvc.netlify.app">
                            <button className="btns">Open SlackTeams In Browser</button>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Layout;
