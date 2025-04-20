import React from 'react';

function Navbar() {
  const showContactMessage = () => {
    alert("Thank you for reaching out! We'll get back to you soon.");
  };

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">Road Explorer</div>
        <ul className="nav-links">
          <li><a href="#home" onClick={handleSmoothScroll}>Home</a></li>
          <li><a href="#about" onClick={handleSmoothScroll}>About</a></li>
          <li><a href="#services" onClick={handleSmoothScroll}>Services</a></li>
          <li><a href="#" onClick={showContactMessage}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
