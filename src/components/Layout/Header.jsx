// Header.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectCurrentUser, logOut } from '../../features/session/sessionSlice';
import { selectCartItems, selectCartTotal } from '../../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartDropdown from '../Cart/CartDropdown';
import './styles/Header.css';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(logOut());
    navigate('/login');
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">E-Commerce</div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/products">Produits</Link></li>
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Rechercher..." />
          <button type="button">Rechercher</button>
        </div>
        <div className="user-actions">
          {loading ? (
            <span>Chargement...</span>
          ) : isLoggedIn && currentUser ? (
            <>
              <span>Bienvenue, <Link to='/profile'>{currentUser.username}</Link></span>
              <button onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/signup">Inscription</Link>
              <Link to="/login">Connexion</Link>
            </>
          )}
        </div>
        <div className="cart-icon-container">
          <div className="cart-icon" onClick={toggleCartVisibility}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </div>
          {cartVisible && <CartDropdown />}
        </div>
      </div>
    </header>
  );
};

export default Header;
