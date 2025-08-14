import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// cant use <a> in react, instead, use <link> from react router dom
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth"
import dumbbell from "../assets/images/dumbbell.png"

export default function Header() {

  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';


  return (

      <Navbar collapseOnSelect expand="sm" variant="dark" bg={loggedIn && !isHomePage ? "dark" : null}>
        {loggedIn ? (
          <>
            <Navbar.Brand as={Link} to="/" className="brand brand-logged d-flex align-items-center">
              <img alt="dumbbell-icon" style={{ display: "inline" }} src={dumbbell} className="dumbbell-icon" />
              RepUp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav className="nav-buttons">
                <Nav.Link as={Link} to="/exercise" eventKey="1" className="nav-pill">Exercise</Nav.Link>
                <Nav.Link as={Link} to="/history" eventKey="2" className="nav-pill">History</Nav.Link>
                <Nav.Link onClick={Auth.logout} className="nav-pill logout">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <Navbar.Brand
            as={Link}
            to="/"
            className={`brand brand-new mx-auto d-flex align-items-center ${isLoginPage || isSignupPage ? "brand-text" : null}`}
          >
            <img alt="dumbbell-icon" style={{ display: "inline" }} src={dumbbell} className="dumbbell-icon" />
            RepUp
          </Navbar.Brand>
        )}
      </Navbar>
  );
}
