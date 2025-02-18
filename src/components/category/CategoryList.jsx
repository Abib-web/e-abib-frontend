import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data.data.categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-list">
      <h2>Nos Catégories</h2>
      <div className="category-items">
        {categories.map((category) => (
          <div key={category._id} className="category-item">
            <img src={`http://localhost:3000${category.image}`} alt={category.name} className="category-image" />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
