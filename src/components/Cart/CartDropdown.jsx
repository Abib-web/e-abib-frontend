// CartDropdown.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal, updateItemQuantity, removeItemFromCart } from '../../features/cart/cartSlice';
import './CartDropdown.css';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity >= 1) {
      dispatch(updateItemQuantity({ itemId, quantity }));
    }
  };

  return (
    <div className="cart-dropdown">
      <h4>Mon Panier</h4>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={`http://localhost:3000${item.images[0]}`} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">{item.price} €</span>
                  <div className="cart-item-quantity">
                    <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => handleRemoveItem(item._id)} className="cart-item-remove">Supprimer</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total:</span>
            <span>{cartTotal} €</span>
          </div>
          <Link to="/cart" className="view-cart-btn">Voir le panier</Link>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
