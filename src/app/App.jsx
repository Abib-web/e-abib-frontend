import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Root from '../components/Layout/Root';
import SignUp from '../components/Auth/Inscription';
import Connexion from '../components/Auth/Connexion';
import UserProfile from '../components/Profile/UserProfile';
import UpdateProfile from '../components/Profile/UpdateProfile';
import PrivateRoute from '../components/Layout/PrivateRoute';
import ProductList from '../components/Products/ProductList';
import { validateToken, selectIsLoggedIn, selectLoading } from '../features/session/sessionSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductDetail from '../components/Products/ProductDetail';
import "./styles/App.css"

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectLoading);
  const [appLoading, setAppLoading] = useState(true);

  // Vérifier le jeton lors du chargement initial de l'application
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(validateToken(token));
    } else {
      setAppLoading(false);
    }
  }, [dispatch]);

  // Mettre à jour l'état de chargement de l'application en fonction de l'état du chargement du token
  useEffect(() => {
    if (!loading) {
      setAppLoading(false);
    }
  }, [loading]);

  // Afficher le spinner de chargement pendant que l'application est en cours de chargement
  if (appLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
          <Route path="products/:productId" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Connexion />} />
        <Route path="profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
