import React, { useState,useEffect } from "react";
import { signUp, selectIsLoggedIn, selectLoading } from '../../features/session/sessionSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import './styles/Inscription.css';
import LoadingSpinner from '../LoadingSpinner';
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

export default function Inscription() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSame, setPasswordSame] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoading);

  useEffect(()=>{
    if(isLoggedIn){
      navigate('/')
    }
  },[isLoggedIn,dispatch]);
  const isStrongPassword = (password) => {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
    return true;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    setConfirmPassword(value);
    if (value === password) {
      setPasswordSame("Le mot de passe correspond");
    } else {
      setPasswordSame("Le mot de passe ne correspond pas");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!email || !username || !password || !confirmPassword) {
      setPasswordError("Veuillez remplir tous les champs !");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas !");
      return;
    }
    if (!isStrongPassword(password)) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule, un chiffre et un caractère spécial.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setPasswordError("Veuillez entrer une adresse email valide !");
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', { username, password, email });
      dispatch(signUp({ user: response.data.user }));
      navigate('/profile');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      if (error.response && error.response.data && error.response.data.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Une erreur s'est produite lors de l'inscription. Veuillez réessayer !");
      }
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
        <Header/>
        <section className="inscription">
          {!isLoggedIn && (
            <>
              <h1>Inscription</h1>
              <form onSubmit={handleSubmit}>
                <label>
                  Email
                  <div>
                    <input
                      id="mail"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </div>
                </label>
                <label>
                  Nom d'utilisateur
                  <div>
                    <input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                  </div>
                </label>
                <label>
                  Mot de passe
                  <div className="password-input">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </label>
                <label>
                  Confirmer le mot de passe
                  <div className="password-input">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </label>
                {passwordSame && <p style={{ color: "green" }}>{passwordSame}</p>}
                {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
                {serverError && <p style={{ color: "red" }}>{serverError}</p>}
                <button type="submit" className="primary">
                  S'inscrire
                </button>
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
            </>
          )}
        </section>
        <Footer/>
      </>
  );
}
