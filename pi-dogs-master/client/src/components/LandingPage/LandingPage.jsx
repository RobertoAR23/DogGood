import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Archivo CSS que hemos creado
import logo from "../../utils/huella.png"

export default function LandingPage() {
   
    return (
        <div className="landing-page">
          <h1>Bienvenido al mundo canino</h1>
          <Link to="/Home" className="logo-button">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
      );
}
