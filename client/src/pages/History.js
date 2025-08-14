import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getMe } from '../utils/API';
import Auth from "../utils/auth";
import { formatDate } from '../utils/dateFormat';
import Header from "../components/Header";

import cardioIcon from "../assets/images/cardio.png";
import resistanceIcon from "../assets/images/resistance.png";
import strengthIcon from "../assets/images/strength-training.png";

const ITEMS_PER_PAGE = 6;

const ExerciseCard = ({ exercise, showDate }) => {
  const getIcon = () => {
    switch (exercise.type) {
      case "cardio":
        return cardioIcon;
      case "resistance":
        return resistanceIcon;
      case "strength":
        return strengthIcon;
      default:
        return null;
    }
  };

  const getDetails = () => {
    switch (exercise.type) {
      case "cardio":
        return `${exercise.distance || 0} miles`;
      case "resistance":
        return `${exercise.weight || 0} pounds`;
      case "strength":
        return `${exercise.weight || 0} pounds`;
      default:
        return "";
    }
  };

  const getCardClass = () => {
    return `history-card ${exercise.type}-title d-flex`;
  };

  return (
    <div className="history-div d-flex">
      <div className="date d-flex align-items-center">
        {showDate ? exercise.date : ''}
      </div>
      {exercise._id ? (
        <Link
          className="text-decoration-none"
          to={`/history/${exercise.type}/${exercise._id}`}
          aria-label={`View details for ${exercise.name} ${exercise.type} exercise`}
        >
          <div className={getCardClass()}>
            <div className="d-flex align-items-center">
              <img
                alt={exercise.type}
                src={getIcon()}
                className="history-icon"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <p className="history-name">{exercise.name || 'Unknown Exercise'}</p>
              <p className="history-index">{getDetails()}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className={getCardClass()}>
          <div className="d-flex align-items-center">
            <img
              alt={exercise.type}
              src={getIcon()}
              className="history-icon"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div>
            <p className="history-name">{exercise.name || 'Unknown Exercise'}</p>
            <p className="history-index">{getDetails()}</p>
            <p className="text-muted small">ID missing - cannot view details</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function History() {
  const [exerciseData, setExerciseData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loggedIn = Auth.loggedIn();

  const getUserData = useCallback(async () => {
    if (!loggedIn) return;

    try {
      setLoading(true);
      setError(null);
      
      const token = Auth.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await getMe(token);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const user = await response.json();

      // 🐛 DEBUGGING: Check what data we're getting from the API
      console.log('=== API RESPONSE DEBUG ===');
      console.log('Raw user data:', user);
      console.log('Cardio data:', user.cardio);
      console.log('Resistance data:', user.resistance);
      console.log('Strength training data:', user.strengthTraining);
      console.log('========================');

      // Process exercise data with better error handling
      const cardio = Array.isArray(user.cardio) 
        ? user.cardio.map((item) => ({
            ...item,
            _id: item._id || item.id, // Handle both _id and id fields
            date: formatDate(item.date),
            type: "cardio",
          }))
        : [];

      const resistance = Array.isArray(user.resistance)
        ? user.resistance.map((item) => ({
            ...item,
            _id: item._id || item.id, // Handle both _id and id fields
            date: formatDate(item.date),
            type: "resistance",
          }))
        : [];

      const strength = Array.isArray(user.strengthTraining)
        ? user.strengthTraining.map((item) => ({
            ...item,
            _id: item._id || item.id, // Handle both _id and id fields
            date: formatDate(item.date),
            type: "strength",
          }))
        : [];

      const allExercise = [...cardio, ...resistance, ...strength];

      // 🐛 DEBUGGING: Check processed exercise data
      console.log('=== PROCESSED DATA DEBUG ===');
      console.log('All exercises before filtering:', allExercise);
      console.log('Exercise IDs check:');
      allExercise.forEach((ex, index) => {
        console.log(`Exercise ${index}:`, {
          name: ex.name,
          type: ex.type,
          _id: ex._id,
          hasValidId: ex._id && ex._id !== 'undefined'
        });
      });
      console.log('===========================');

      // Filter out exercises without valid IDs and add debugging
      const validExercises = allExercise.filter(exercise => {
        const hasValidId = exercise._id && exercise._id !== 'undefined';
        if (!hasValidId) {
          console.warn('Exercise missing valid ID:', exercise);
        }
        return hasValidId;
      });

      // Sort by date (newest first)
      validExercises.sort((a, b) => new Date(b.date) - new Date(a.date));

      setExerciseData(validExercises);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message || 'Failed to load exercise data');
    } finally {
      setLoading(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const showMoreItems = useCallback(() => {
    setDisplayedItems(prev => prev + ITEMS_PER_PAGE);
  }, []);

  // Memoize the displayed exercises with date grouping logic
  const displayedExercises = useMemo(() => {
    const exercises = exerciseData.slice(0, displayedItems);
    let currentDate = null;
    
    return exercises.map(exercise => {
      let showDate = false;
      if (exercise.date !== currentDate) {
        currentDate = exercise.date;
        showDate = true;
      }
      
      return {
        ...exercise,
        showDate
      };
    });
  }, [exerciseData, displayedItems]);

  const hasMoreItems = exerciseData.length > displayedItems;

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="history">
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className="title">History</h2>

        {loading && (
          <div className="text-center">
            <p>Loading your exercise history...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <p>Error: {error}</p>
            <button 
              className="btn btn-primary" 
              onClick={getUserData}
              disabled={loading}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {exerciseData.length > 0 ? (
              <div className="history-data">
                {displayedExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise._id}
                    exercise={exercise}
                    showDate={exercise.showDate}
                  />
                ))}

                {hasMoreItems && (
                  <div className="d-flex justify-content-center">
                    <button 
                      className="show-btn" 
                      onClick={showMoreItems}
                      aria-label="Show more exercises"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                      Show More
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h3 className="history-text">No exercise data yet...</h3>
                <Link to="/exercise">
                  <button className="home-btn">Add Exercise</button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}