import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog, getAllTemperament, getAllDogs } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import './create.css'; // Archivo CSS que hemos creado

export default function Create() {
    const dispatch = useDispatch();
    let { temperamen } = useSelector((state) => state); // obtengo el estado actual del store
    temperamen = [...new Set(temperamen)];
    temperamen.sort();
    // console.log("CREATEEE ", temperamen)
    // Los datos que le paso al post
    const [input, setInput] = useState({
        name: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        image: "",
        life_spanMin: "",
        life_spanMax: "",
        temperament: [],
    })

    // Función que se ejecuta cada vez que cambia el valor de un input
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    useEffect(() => {
        dispatch(getAllTemperament());
    }, [dispatch]);

    return (
        // BOTONES A HOME Y HECHO
        <div className="Create">
            <h2>Create your own dog</h2>
            <div className="button-container">
                <Link to="/Home">
                    <button id="back-btn">Home</button>
                </Link>
                <button type='submit'>Done</button>
            </div>
            {/* ------------------------------------------------------------------------------------ */}
            {/* FORMULARIO */}
            <form className="form-container">
                <div className='formulario'>
                    {/* NOMBRE DEL PERRO */}
                    <label>Name:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        autocomplete="off"
                        onChange={handleChange}
                    />
                    {/* PESOs DEL PERRO */}
                    <label>Weight min:</label>
                    <input
                        type="number"
                        value={input.weightMin}
                        name="weightMin"
                        onChange={handleChange}
                    />
                    <label>Weight max:</label>
                    <input
                        type="number"
                        value={input.weightMax}
                        name="weightMax"
                        onChange={handleChange}
                    />
                    {/* ALTURA DEL PERRO */}
                    <label>Height min:</label>
                    <input
                        type="number"
                        value={input.heightMin}
                        name="heightMin"
                        onChange={handleChange}
                    />
                    <label>Height max:</label>
                    <input
                        type="number"
                        value={input.heightMax}
                        name="heightMax"
                        onChange={handleChange}
                    />
                    {/* IMAGEN DEL PERRO */}
                    <label>Image:</label>
                    <input
                        type="text"
                        value={input.image}
                        name="image"
                        autocomplete="off"
                        onChange={handleChange}
                    />
                    {/* AÑOS DE VIDA DEL PERRO */}
                    <label>Life span min:</label>
                    <input
                        type="number"
                        value={input.life_spanMin}
                        name="life_spanMin"
                        onChange={handleChange}
                    />
                    <label>Life span max:</label>
                    <input
                        type="number"
                        value={input.life_spanMax}
                        name="life_spanMax"
                        onChange={handleChange}
                    />
                    {/* TEMPERAMENTOS DEL PERRO */}
                    <select onChange={(e) => handleSelect(e)}>
                        {temperamen && temperamen.length > 0 && temperamen.map((temp) => (
                            <option value={temp}>
                                {temp}
                            </option>
                        ))}
                    </select>
                    {/* Muestro los temperamentos seleccionados */}
                    <ul><li>{input.temperament.map(el => el + " ,")}</li></ul>
                </div>
            </form>
        </div>
    )
}