import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hangout from './images/hangout.svg';

const Present = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            delay: 500
        });
    });
    return (
        <>
            <section className="hangout" id="reliability">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-7" data-aos="fade-up">
                            <img src={Hangout} alt="Hangout" />
                        </div>
                        <div class="col-sm-12 col-md-5" data-aos="fade-up">
                            <h1>From few to a fandom</h1>
                            <p>Get any community running with moderation tools and custom member access. Give members special powers, set up private video chat channels, and more.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Present;
