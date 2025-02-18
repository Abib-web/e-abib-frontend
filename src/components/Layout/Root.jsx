import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BrandList from '../brand/BrandList';
import CategoryList from '../category/CategoryList';
import './styles/Root.css';
import SlideShow from '../Slides/SlideShow';
import BandePromotionnelle from '../bande/BandePromotionnelle';
import ProductList from '../Products/ProductList';

const Root = () => {
  return (
    <>
      <Header />
      <BandePromotionnelle />
      <SlideShow />
      <main className="main-content">
        <section className="intro-section">
          <h1>Bienvenue sur notre boutique</h1>
          <p>Découvrez nos catégories et marques exclusives</p>
        </section>
        <section className="brand-category-section">
          <CategoryList />
          <BrandList />
        </section>
        <section className="products-section">
          <p className="section-title">Nos Produits</p>
          <ProductList />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Root;
