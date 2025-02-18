import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BrandList.css';

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await axios.get('http://localhost:3000/api/brands');
      setBrands(response.data.data.brands);
    };

    fetchBrands();
  }, []);

  return (
    <div className="brand-list">
      <h2>Nos Marques</h2>
      <div className="brand-items">
        {brands.map((brand) => (
          <div key={brand._id} className="brand-item">
            <img src={`http://localhost:3000${brand.image}`} alt={brand.name} className="brand-image" />
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandList;
