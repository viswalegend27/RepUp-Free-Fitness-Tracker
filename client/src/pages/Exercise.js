import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png"
import resistanceIcon from "../assets/images/resistance.png"
import strengthTrainingIcon from "../assets/images/strength-training.png"


export default function Exercise() {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate()


  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
<div className="exercise-background">
  <Header />

  <div className="exercise-layout">
    {/* Exercise content only */}
    <div className="exercise-content text-center">
      <h2 className="title">Add Exercise</h2>
      <div className="exercise-buttons">
        <button
          className="cardio-btn"
          onClick={() => navigate("/exercise/cardio")}
        >
          <img alt="cardio" src={cardioIcon} className="exercise-icon" />
          Cardio
        </button>
        <button
          className="resistance-btn"
          onClick={() => navigate("/exercise/resistance")}
        >
          <img alt="resistance" src={resistanceIcon} className="exercise-icon" />
          Resistance
        </button>
        <button
          className="strengthtraining-btn"
          onClick={() => navigate("/exercise/strengthtraining")}
        >
          <img alt="strengthtraining" src={strengthTrainingIcon} className="exercise-icon" />
          Strength training
        </button>
      </div>
    </div>
  </div>
</div>
  );
}


