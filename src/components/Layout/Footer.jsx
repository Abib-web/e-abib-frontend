import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/">Accueil</a>
          <a href="/products">Produits</a>
          <a href="/contact">Contact</a>
          <a href="/about">À propos</a>
        </div>
        <div className="contact-info">
          <p>Email: <a href="mailto:support@ecommerce.com">support@ecommerce.com</a></p>
          <p>Téléphone: <a href="tel:+1234567890">+123 456 7890</a></p>
        </div>
      </div>
      <div className="legal-info">
        <p>&copy; 2024 E-Commerce. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
