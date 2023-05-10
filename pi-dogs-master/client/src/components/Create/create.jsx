import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog, getAllTemperament, getAllDogs } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import './create.css';
import validate from './validate'


export default function Create() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState({});
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
    // -------------------------------------------HANDLES-------------------------------------------
    // Función que se ejecuta cada vez que cambia el valor de un input
    function handleChange(e) {

        if (e.target.name === "weightMin") {
            setInput({
                ...input,
                [e.target.name]: Number(e.target.value) < 0 ? "" : e.target.value,
            });
        } else if (e.target.name === "weightMax") {
            setInput({
                ...input,
                [e.target.name]: Number(e.target.value) < 0 ? "" : e.target.value,
            })
        }
        else if (e.target.name === "heightMin") {
            setInput({
                ...input,
                [e.target.name]: Number(e.target.value) < 0 ? "" : e.target.value,
            });
        }
        else if (e.target.name === "heightMax") {
            setInput({
                ...input,
                [e.target.name]: Number(e.target.value) < 0 ? "" : e.target.value,
            })
        }
        else if (e.target.name === "life_spanMin") {
            setInput({
                ...input,
                [e.target.name]: Number(e.target.value) < 0 ? "" : e.target.value,
            });
        }
        else if (e.target.name === "life_spanMax") {
            setInput({
                ...input,
                [e.target.name]: Number(e.target.value) < 0 ? "" : e.target.value,
            })
        }

        else {
            setError(
                validate({
                    ...input,
                    [e.target.name]: e.target.value,
                })
            );
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });

        }
        console.log(input);
    }
    // funcion para seleccionar temperamentos
    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    // funcion para borrar temperament seleccionados
    function handleDelete(index) {
        const newTemperament = [...input.temperament];
        newTemperament.splice(index, 1);
        setInput({ ...input, temperament: newTemperament });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input));
        alert("Dog created successfully");
        setInput({
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
        history.push("/Home");
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
            </div>
            {/* ------------------------------------------------------------------------------------ */}
            {/* FORMULARIO */}
            <form onSubmit={(e) => handleSubmit(e)} className="form-container">
                <div className='formulario'>
                <button type='submit'>Done</button>
                    {/* NOMBRE DEL PERRO */}
                    <label>Name:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        autoComplete="off"
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
                        autoComplete="off"
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
                        {temperamen && temperamen.length > 0 && temperamen.map((temp, index) => (
                            <option key={index} value={temp}>
                                {temp}
                            </option>
                        ))}
                    </select>
                    {/* Muestro los temperamentos seleccionados */}
                    {input.temperament.length > 0 && (
                        <ol>
                            {input.temperament.map((el, index) => (
                                <li key={index}>
                                    {el}
                                    <button type="button" onClick={() => handleDelete(index)}>Eliminar</button>
                                    {index !== input.temperament.length - 1 && ", "}
                                </li>
                            ))}
                        </ol>
                    )}

                </div>
            </form>
        </div>
    )
}