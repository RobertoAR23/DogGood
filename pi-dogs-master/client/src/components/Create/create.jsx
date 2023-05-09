import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog,getAllTemperament } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import './create.css'; // Archivo CSS que hemos creado

export default function Create() {
    return (
        // BOTONES A HOME Y HECHO
        <div className="Create">
            <h2>Create your own dog</h2>
            <div className="button-container">
                <Link to="/Home">
                    <button id="back-btn">Home</button>
                </Link>
                    <button id="create-btn">Done</button>
            </div>
            {/* ------------------------------------------------------------------------------------ */}
        </div>
    )
}