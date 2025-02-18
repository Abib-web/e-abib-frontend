import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SlideShow.css';

const SlideShow = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const response = await axios.get('http://localhost:3000/api/slides');
      setSlides(response.data.data.slides);
    };

    fetchSlides();
  }, []);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div key={index} className="slide">
          <img src={`http://localhost:3000${slide.image}`} alt={slide.title} className="slide-image" />
          <div className="slide-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            {slide.link && <a href={slide.link} className="slide-link">En savoir plus</a>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideShow;
