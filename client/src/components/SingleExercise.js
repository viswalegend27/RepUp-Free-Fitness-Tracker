import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Auth from '../utils/auth';
import {
  getCardioById,
  getResistanceById,
  getStrengthTrainingById,
  deleteCardio,
  deleteResistance,
  deleteStrengthTraining
} from '../utils/API';

import { formatDate } from '../utils/dateFormat';
import Header from "./Header";
import cardioIcon from "../assets/images/cardio-w.png";
import resistanceIcon from "../assets/images/resistance-w.png";
import strengthIcon from "../assets/images/strength-training-w.png"; 

export default function SingleExercise() {
  const { id, type } = useParams();
  console.log("🧭 Params - ID:", id, "| Type:", type);
  const [cardioData, setCardioData] = useState({});
  const [resistanceData, setResistanceData] = useState({});
  const [strengthData, setStrengthData] = useState({});
  const navigate = useNavigate();

  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    const displayExercise = async (exerciseId) => {
      const token = loggedIn ? Auth.getToken() : null;
      if (!token) return false;

      try {
        if (type === "cardio") {
          const response = await getCardioById(exerciseId, token);
          if (!response.ok) throw new Error("Something went wrong!");
          const data = await response.json();
          data.date = formatDate(data.date);
          setCardioData(data);
        } else if (type === "resistance") {
          const response = await getResistanceById(exerciseId, token);
          if (!response.ok) throw new Error("Something went wrong!");
          const data = await response.json();
          data.date = formatDate(data.date);
          setResistanceData(data);
        } else if (type === "strength" || type === "strengthtraining") {
          const response = await getStrengthTrainingById(exerciseId, token);
          if (!response.ok) throw new Error("Something went wrong!");
          const data = await response.json();
          // console.log("📄 Strength Record Retrieved:", data);
          data.date = formatDate(data.date);
          setStrengthData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    displayExercise(id);
  }, [id, type, loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  const handleDeleteExercise = async (exerciseId) => {
    const token = loggedIn ? Auth.getToken() : null;
    if (!token) return false;

    confirmAlert({
      title: "Delete Exercise",
      message: "Are you sure you want to delete this exercise?",
      buttons: [
        { label: "Cancel" },
        {
          label: "Delete",
          onClick: async () => {
            try {
              if (type === "cardio") {
                const response = await deleteCardio(exerciseId, token);
                if (!response.ok) throw new Error("Something went wrong!");
              } else if (type === "resistance") {
                const response = await deleteResistance(exerciseId, token);
                if (!response.ok) throw new Error("Something went wrong!");
              } else if (type === "strength") {
                const response = await deleteStrengthTraining(exerciseId, token);
                if (!response.ok) throw new Error("Something went wrong!");
              }

              navigate("/history");
            } catch (err) {
              console.error(err);
            }
          }
        }
      ]
    });
  };

  return (
    <div className={
      type === "cardio"
        ? "single-cardio"
        : type === "resistance"
          ? "single-resistance"
          : "single-strength"
    }>
      <Header />
      <h2 className='title text-center'>History</h2>

      <div className="single-exercise d-flex flex-column align-items-center text-center">
        {type === "cardio" && (
          <div className='cardio-div'>
            <div className='d-flex justify-content-center'>
              <img alt="cardio" src={cardioIcon} className="exercise-form-icon" />
            </div>
            <p><span>Date: </span>{cardioData.date}</p>
            <p><span>Name: </span>{cardioData.name}</p>
            <p><span>Distance: </span>{cardioData.distance} miles</p>
            <p><span>Duration: </span>{cardioData.duration} minutes</p>
            <button className='delete-btn' onClick={() => handleDeleteExercise(id)}>Delete Exercise</button>
          </div>
        )}

        {type === "resistance" && (
          <div className='resistance-div'>
            <div className='d-flex justify-content-center'>
              <img alt="resistance" src={resistanceIcon} className="exercise-form-icon" />
            </div>
            <p><span>Date: </span>{resistanceData.date}</p>
            <p><span>Name: </span>{resistanceData.name}</p>
            <p><span>Weight: </span>{resistanceData.weight} lbs</p>
            <p><span>Sets: </span>{resistanceData.sets}</p>
            <p><span>Reps: </span>{resistanceData.reps}</p>
            <button className='delete-btn' onClick={() => handleDeleteExercise(id)}>Delete Exercise</button>
          </div>
        )}

        {type === "strength" && (
          <div className='strength-div'>
            <div className='d-flex justify-content-center'>
              <img alt="strength" src={strengthIcon} className="exercise-form-icon" />
            </div>
            <p><span>Date: </span>{strengthData.date}</p>
            <p><span>Name: </span>{strengthData.name}</p>
            <p><span>Weight: </span>{strengthData.weight} lbs</p>
            <p><span>Sets: </span>{strengthData.sets}</p>
            <p><span>Reps: </span>{strengthData.reps}</p>
            <button className='delete-btn' onClick={() => handleDeleteExercise(id)}>Delete Exercise</button>
          </div>
        )}
      </div>
    </div>
  );
}
