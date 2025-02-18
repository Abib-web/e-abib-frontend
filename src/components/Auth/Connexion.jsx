import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectIsLoggedIn, selectLoading  } from '../../features/session/sessionSlice';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import './styles/Connexion.css';
import LoadingSpinner from '../LoadingSpinner';
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoading);
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/')
    }
  },[isLoggedIn,dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Veuillez remplir tous les champs !");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('accessToken', response.data.token); // Assurez-vous d'utiliser 'token' au lieu de 'accessToken'
      dispatch(loginUser(response.data.data.user));
      navigate('/profile');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setError("Adresse email ou mot de passe incorrect !");
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Header/>
      <section className="connexion">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Se connecter</button>
        </form>
        <div className="oauth-icons">
          <a href="http://localhost:3000/api/auth/google" className="oauth-icon google">
            <FaGoogle />
          </a>
          <a href="http://localhost:3000/api/auth/facebook" className="oauth-icon facebook">
            <FaFacebook />
          </a>
          <a href="http://localhost:3000/api/auth/apple" className="oauth-icon apple">
            <FaApple />
          </a>
        </div>
      </section>
      <Footer/>
    </>
  );
}
