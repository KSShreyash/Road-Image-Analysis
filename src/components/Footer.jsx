import React from 'react';

function Footer() {
  const submitForm = () => {
    alert('Thank You For Your Interest');
  };

  return (
    <footer className="end">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Created By</h3>
          <p>Kumar Shreyash</p>
          <p>23BCE1882</p>
          <p>Clovis</p>
          <p>23BCE1866</p>
          <p>Naveen</p>
          <p>23BCE1949</p>
        </div>
        <div className="footer-column">
          <h3>MENU</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
          </ul>
        </div>
      
        <div className="footer-column">
          <h3>JOIN US</h3>
          <form>
            <input type="email" placeholder="Your email address" required />
            <button type="button" onClick={submitForm}>SIGN UP</button>
          </form>
          <div className="social-icons">
            <a href="#"><img src="https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF" alt="Shreyash_LinkedIn" />Shreyash</a>
            <a href="#"><img src="https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF" alt="Clovis_LinkedIn" />Clovis</a>
            <a href="#"><img src="https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF" alt="Navin_LinkedIn" />Naveen</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p><strong>Web Project</strong></p>
        <p>© 2023 Batch. Built using HTML, CSS and <a href="https://www.javascript.com/">JavaScript</a></p>
      </div>
    </footer>
  );
}

export default Footer;
