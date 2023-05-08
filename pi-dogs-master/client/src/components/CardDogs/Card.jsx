import "./Card.css";
import React from "react";
import { Link } from "react-router-dom";


export default function Card({ name, image, weightMin, weightMax, temperament, TempDogs, id }) {
  let texto = "";
  if (temperament) {
    for (let i = 0; i < temperament.length; i++) {
      texto = texto + temperament[i] + " ";
    }
  }
  if (TempDogs) {
    for (let i = 0; i < TempDogs.length; i++) {
      texto = texto + TempDogs[i] + " ";
    }
  }
  return (
    <div className="card">
      <div>
        <Link to={`/dogs/${id}`} style={{ textDecoration: 'none' }}>
          <h5 className="card-title">{name}</h5>
        </Link>

        <div className="card-img-container">
          <img src={image} alt="dog" className="card-img"  />      </div>
      </div>
      <div className="card-body">
        {texto ? (<div>Temperamento: {texto}</div>) : (<div>This dog hasn't soul</div>)}
        <p className="card-text">Weight Min: {weightMin}</p>
        <p className="card-text">Weight Max: {weightMax}</p>
      </div>
    </div>
  );
}
