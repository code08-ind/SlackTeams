import React, { useEffect } from 'react';
import Video from './images/video.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            delay: 500
        });
    });
    return (
        <>
            <section className="about" id="about">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-7" data-aos="fade-up">
                            <img src={Video} alt="VideoChat" />
                        </div>
                        <div class="col-sm-12 col-md-5" data-aos="fade-up">
                            <h1>Create an invite-only place where you belong</h1>
                            <p>SlackTeams Gives You Chance To Join Into Various Meetings And Videochat With Anyone You Like.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
