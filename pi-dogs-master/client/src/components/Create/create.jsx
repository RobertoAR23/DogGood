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
        const limitProps = {
            weightMin: 0,
            weightMax: 0,
            heightMin: 0,
            heightMax: 0,
            life_spanMin: 0,
            life_spanMax: 0
        };
        // Obtenemos el nombre y el valor del elemento que desencadenó el evento de cambio
        const { name, value } = e.target;
        // Si el valor es menor a 0, asignamos una cadena vacía, de lo contrario, mantenemos el valor original
        const inputValue = Number(value) < 1 ? "" : value;
        // Verificamos si el nombre está presente en limitProps
        if (limitProps.hasOwnProperty(name)) {
            // Si el nombre está en limitProps, actualizamos el estado input con la propiedad correspondiente
            setInput({
                ...input,
                [name]: inputValue
            });
        } else {
            // Si el nombre no está en limitProps, realizamos las validaciones de error y actualizamos el estado input
            setError(validate({
                ...input,
                [name]: value
            }));
            setInput({
                ...input,
                [name]: value
            });
        }

        console.log(input);
    }


    // funcion para seleccionar temperamentos
    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...new Set([...input.temperament, e.target.value])]
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
        const errors = validate(input);

        if (Object.keys(errors).length > 0) {
            let errorCount = Object.keys(errors).length;
            let errorMessage = `Form incomplete. Please fill in all required fields.\nTotal errors: ${errorCount} \n\n`;
            for (let key in errors) {
                errorMessage += `${errors[key]}\n`;
            }
            alert(errorMessage);
            return;
        }

        console.log(input);
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
        });
        history.push("/Home");
    }

    useEffect(() => {
        dispatch(getAllTemperament());
    }, [dispatch]);

    useEffect(() => {
        setError(validate(input))
    }, [input]);
    // ==========================================AQUI EMPIEZA EL RETURN==========================================
    return (
        // BOTONES A HOME Y HECHO
        <div className="Create">
            <Link to="/Home">
                <button id="DetailH">Home</button>
            </Link>
            <h2>Create your own dog</h2>
            {/* ------------------------------------------------------------------------------------ */}
            {/* FORMULARIO */}
            <div className="Create create-dog">
                <form onSubmit={(e) => handleSubmit(e)} className="form-container">
                    <div className='formulario'>
                        {/* NOMBRE DEL PERRO */}
                        <li>
                            <label>Name </label>
                            <input
                                type="text"
                                value={input.name}
                                name="name"
                                autoComplete="off"
                                onChange={handleChange}
                            />
                            {error.name && (<p className='danger'>{error.name}</p>)}
                        </li>
                        {/* PESOs DEL PERRO */}
                        <li>
                            <label>Weight min </label>
                            <input
                                type="number"
                                value={input.weightMin}
                                name="weightMin"
                                onChange={handleChange}
                            />
                            {error.weightMin && (<p className='danger'>{error.weightMin}</p>)}
                        </li>
                        <li>
                            <label>Weight max </label>
                            <input
                                type="number"
                                value={input.weightMax}
                                name="weightMax"
                                onChange={handleChange}
                            />
                            {error.weightMax && (<p className='danger'>{error.weightMax}</p>)}
                        </li>
                        {/* ALTURA DEL PERRO */}
                        <li>
                            <label>Height min </label>
                            <input
                                type="number"
                                value={input.heightMin}
                                name="heightMin"
                                onChange={handleChange}
                            />
                            {error.heightMin && (<p className='danger'>{error.heightMin}</p>)}
                        </li>
                        <li>
                            <label>Height max </label>
                            <input
                                type="number"
                                value={input.heightMax}
                                name="heightMax"
                                onChange={handleChange}
                            />
                            {error.heightMax && (<p className='danger'>{error.heightMax}</p>)}
                        </li>
                        {/* IMAGEN DEL PERRO */}
                        <li>
                            <label>Image </label>
                            <input
                                type="text"
                                value={input.image}
                                name="image"
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </li>
                        {/* AÑOS DE VIDA DEL PERRO */}
                        <li>
                            <label>Life span min:</label>
                            <input
                                type="number"
                                value={input.life_spanMin}
                                name="life_spanMin"
                                onChange={handleChange}
                            />
                            {error.life_spanMin && (<p className='danger'>{error.life_spanMin}</p>)}
                        </li>
                        <li>
                            <label>Life span max:</label>
                            <input
                                type="number"
                                value={input.life_spanMax}
                                name="life_spanMax"
                                onChange={handleChange}
                            />
                            {error.life_spanMax && (<p className='danger'>{error.life_spanMax}</p>)}
                        </li>
                        {/* TEMPERAMENTOS DEL PERRO */}
                        <select onChange={(e) => handleSelect(e)}>
                            {temperamen && temperamen.length > 0 && temperamen.map((temp, index) => (
                                <option key={index} value={temp}>
                                    {temp}
                                </option>
                            ))}
                        </select>
                        {/* Muestro los temperamentos seleccionados */}
                        <div className='show-temp'>
                            <label>Selected:</label>
                            {input.temperament.length > 0 ? (
                                <ol>
                                    {input.temperament.map((el, index) => (
                                        <li key={index}>
                                            {el}
                                            <button id='delet' type="button" onClick={() => handleDelete(index)}>Delet</button>
                                            {index !== input.temperament.length - 1 && ", "}
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p>Please select at least one temperament</p>
                            )}
                        </div>
                        <button id='DetailH' type='submit'>Done</button>
                    </div>
                </form>
            </div>
        </div>

    )
}