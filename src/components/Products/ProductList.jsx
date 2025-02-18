import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addItemToCart } from '../../features/cart/cartSlice';
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data.data.products);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product._id} className="product-item">
          <img src={`http://localhost:3000${product.images[0]}`} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price} €</p>
          <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
