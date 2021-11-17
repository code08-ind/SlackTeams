import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BusinessVideo from './images/businessvideo.svg';

const Features = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            delay: 500
        });
    });
    return (
        <>
            <section className="features" id="features">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-7" data-aos="fade-up">
                            <img src={BusinessVideo} alt="Business Video Chat" />
                        </div>
                        <div class="col-sm-12 col-md-5" data-aos="fade-up">
                            <h1>Where hanging out is easy</h1>
                            <p>Grab a seat in a voice mode when you’re free. Friends in video chat can see you’re around and instantly pop in to talk with a call.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Features;