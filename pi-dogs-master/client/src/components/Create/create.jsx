import React from 'react';
import { Link } from 'react-router-dom';
import './create.css'; // Archivo CSS que hemos creado

export default function Create() {
    return (
        // BOTONES A HOME Y HECHO
        <div className="Create">
            <h2>Create your own dog</h2>
            <div className="button-container">
                    <button id="create-btn">Done</button>
                <Link to="/Home">
                    <button id="back-btn">Home</button>
                </Link>
            </div>
            {/* ------------------------------------------------------------------------------------ */}
        </div>
    )
}