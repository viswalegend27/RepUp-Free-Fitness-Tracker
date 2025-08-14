import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Auth from "../utils/auth";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();
  const [loading, setLoading] = useState(false);

  const handleMouseLeave = (e) => {
    const title = e.target;
    delete title.dataset.emoji; 
    title.classList.remove("idle-state"); 
    title.classList.remove("hover-state"); 
  };

  const handleNavigation = (path) => {
    setLoading(true); // Show loading message
    setTimeout(() => {
      navigate(path); // Navigate after short delay (optional)
    }, 800); // 0.8 sec delay so user sees loading text
  };

  return (
    <div className="homepage">
      <Header />
      <Container className="home d-flex flex-column align-items-center justify-content-center flex-wrap text-center">
        <h2 
          className="home-title" 
          onMouseLeave={handleMouseLeave}
          data-emoji=""
          style={{ position: "relative" }}
        >
          Create your own workout program
        </h2>
        <p className="home-text">
          Cardio? Resistance? Or both? Track your daily exercises and stay fit
          with us.
        </p>

        {loading ? (
          <p className="loading-state">Loading, please wait...</p>
        ) : loggedIn ? (
          <button className="home-btn" onClick={() => handleNavigation("/exercise")}>
            Add Exercise
          </button>
        ) : (
          <button className="home-btn" onClick={() => handleNavigation("/signup")}>
            Get Started
          </button>
        )}
      </Container>
    </div>
  );
}
