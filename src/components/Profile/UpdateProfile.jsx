import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setCurrentUser } from "../../features/session/sessionSlice";
import axios from 'axios';
import './styles/UserProfile.css';
import './styles/UpdateProfile.css'

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        dispatch(setCurrentUser(response.data));
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du profil :', error);
        setError("Une erreur s'est produite lors de la récupération de vos informations.");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setFirstName(currentUser?.firstName || "");
    setLastName(currentUser?.lastName || "");
    setAddress(currentUser?.address || "");
    setPhone(currentUser?.phone || "");
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:3000/api/profile/${currentUser._id}`, {
        firstName,
        lastName,
        address,
        phone
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      setSuccess("Vos informations ont été mises à jour avec succès !");
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
      setError("Une erreur s'est produite lors de la mise à jour de vos informations. Veuillez réessayer !");
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!currentUser) {
    return <p>Veuillez vous connecter pour accéder à votre profil.</p>;
  }
  
  return (
    <>
      <h1>Mettre à jour votre profil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prénom
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
        </label>
        <label>
          Nom de famille
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
        </label>
        <label>
          Adresse
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
        </label>
        <label>
          Téléphone
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Mettre à jour</button>
      </form>
    </>
  );
}
