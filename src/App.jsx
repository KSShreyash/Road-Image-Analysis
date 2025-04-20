import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Banner from './components/Banner';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import ParticlesWrapper from './ParticlesWrapper';

function App() {
  return (
    <>
      <ParticlesWrapper />
      <Navbar />
      <Hero />
      <Banner />
      <About />
      <Banner />
      <Services />
      <Footer />
    </>
  );
}

export default App;
