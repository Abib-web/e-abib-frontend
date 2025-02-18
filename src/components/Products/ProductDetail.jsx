// ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addItemToCart } from '../../features/cart/cartSlice';
import '../styles/ProductDetail.css';
import LoadingSpinner from '../LoadingSpinner';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
      setProduct(response.data.data.product);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <LoadingSpinner />;
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="product-detail">
      <h1 className="product-title">{product.name}</h1>
      <div className="product-detail-content">
        <div className="product-images">
          <div className="main-image">
            <img src={`http://localhost:3000${product.images[0]}`} alt={product.name} />
          </div>
          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:3000${image}`}
                alt={product.name}
                className="thumbnail"
                onClick={() => {
                  const mainImage = document.querySelector('.main-image img');
                  mainImage.src = `http://localhost:3000${image}`;
                }}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <p>{product.description}</p>
          <p className="product-price">{product.price} €</p>
          <p>Catégorie: {product.category}</p>
          <p>Quantité disponible: {product.quantityAvailable}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
