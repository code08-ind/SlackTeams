import React from 'react';
import About from './About';
import Features from './Features';
import Present from './Present';
import Hero from './Hero';
import Navbar from './Navbar';
import Layout from './Layout';
import Footer from './Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Present />
            <Layout />
            <Footer />
        </>
    );
}

export default Home;
