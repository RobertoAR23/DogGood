import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// useDispatch() para poder usar la action y useSelector() para poder usar el estado actual del store
import { getAllDogs, getAllTemperament, filterTemperament, orderByName, orderByWeight, filterCreated } from "../../actions/index";
import CardDogs from "../CardDogs/Card";
import Pagination from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import notRaza from "../../utils/dog.png";
import styles from "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch(); // useDispatch() para poder usar la action
    let { temperamen, dogsFilter } = useSelector((state) => state); // obtengo el estado actual del store
    const [order, setOrder] = useState(""); // guardo el orden en el que se muestran los perros
    const [charge, setCharge] = useState(false); // variable para saber si esta cargando

    // ordeno los temperamentos
    temperamen = [...new Set(temperamen)];
    temperamen.sort();
    // console.log("Temperamentos ",temperamen)

    useEffect(() => {
        setCharge(true);
        setTimeout(() => {
            setCharge(false);
        }, 3000);
        dispatch(getAllDogs()); // llamo a la action que me interesa
        dispatch(getAllTemperament()); // llamo a la action que me interesa
    }, [dispatch]); // [] para que no se ejecute cada vez que se renderiza el componente

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8); //cantidad de dogs por pagina
    const indexOfLastDog = currentPage * dogsPerPage; // calculo el indice del ultimo perro que se va a mostrar
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // calculo el indice del primer perro que se va a mostrar
    const currentDogs = dogsFilter.slice(indexOfFirstDog, indexOfLastDog); // obtengo los perros que se van a mostrar

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    function handleFilterByTemperament(e) {
        e.preventDefault(e);
        dispatch(filterTemperament(e.target.value)); // llamo a la action que me interesa
        setCurrentPage(1);
        setOrder(e.target.value); // cambio el orden de los perritos
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleSortWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleFilterByCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    return (
        <div className="Home">
            <SearchBar />
            <div>
                <div className="welcome">
                    <h1>Find your Dog!</h1>
                </div>
            </div>
            <div className="button-container">
                <Link to="/Create">
                    <button id="create-btn">Create</button>
                </Link>
                <Link to="/">
                    <button id="back-btn">Back</button>
                </Link>
            </div>
            {/* ----------------------FILTROS------------------- */}
            <div className={styles.filter}>
                {/* ----------------------Orden Alfabetico --------------------*/}
                <select onChange={(e) => handleSort(e)}>
                    <option value="ALP" disabled selected>Alphabetical order</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
                {/* ----------------------Filtro Temperamentos --------------------*/}
                <select className={styles.select} onChange={(e) => handleFilterByTemperament(e)} >
                    <option value="all">All temperaments</option>
                    {temperamen.map((TempDogs // recorro el array de temperamentos
                    ) => (
                        <option key={TempDogs.id} value={TempDogs.name}>
                            {" "}
                            {/* creo un option por cada temperamento */}
                            {TempDogs} {/* muestro el nombre del temperamento */}
                        </option>
                    )
                    )}
                </select>
            </div>
            <div className={styles.filter}>
                {/* ----------------------Filtro por Creacion --------------------*/}
                <select className={styles.select} onChange={(e) => handleFilterByCreated(e)}>
                    <option value="CREATED" disabled selected>
                        Filter by create
                    </option>
                    <option value="All">All</option>
                    <option value="Exist">Exist</option>
                    <option value="Created">Created</option>
                </select>
                <select defaultValue="WEIGHT" className={styles.select} onChange={(e) => handleSortWeight(e)}>
                    <option value="WEIGHT" disabled selected>
                        Order by weight
                    </option>
                    <option value="min">Weight Min</option>
                    <option value="max">Weight Max</option>
                </select>
            </div>
            {/* ----------------------PAGINADO------------------- */}
            <Pagination
                dogsPerPage={dogsPerPage} // cantidad de perritos por pagina
                allDogs={dogsFilter.length} // cantidad de perritos
                currentPage={currentPage} // pagina actual
                paginado={paginate} // funcion para paginacion
            />
            {/* ----------------------CARDS------------------- */}
            <div className="card-Home">
                {charge ? (
                    <div>
                        <img className={styles.loading} src="https://i.giphy.com/media/ar8zpFnzWcSbAxjJmd/giphy.webp" alt="loading" />
                    </div>
                ) : currentDogs.length ? (
                    currentDogs.map((dog) => (
                        <CardDogs className="text-card-home"
                            key={dog.id}
                            id={dog.id}
                            name={dog.name}
                            image={dog.image}
                            temperament={dog.temperament}
                            weightMin={dog.weightMin}
                            weightMax={dog.weightMax}
                        />
                    ))
                ) : (
                    <div>
                        <h1>No dogs found</h1>
                        <img src={notRaza} alt="not_raza" />
                    </div>
                )}
            </div>
        </div>
    );
}