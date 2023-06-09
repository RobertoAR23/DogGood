import { 
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENT,
    GET_DESCRIPTION,
    GET_CLEAN,
    GET_DOGS_FOR_NAME,
    DELETE_DOG,
    FILTER_TEMPERAMENT,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    FILTER_CREATED,
    SET_LOADING,
    ERROR
} from "../action-types/index";
import axios from "axios";

// Action para obtener datos desde el back el cual esta corriendo en el puerto 3001
export const getAllDogs = () => {
    //obtener todos los perros en /dogs por medio de un get
    return (dispatch) => {
        axios.get("http://localhost:3001/dogs") //trae todos los perros
        .then(response => {
            console.log('Data received:', response.data); // Verifica si se están recibiendo los datos correctamente
            dispatch({
                type: GET_ALL_DOGS,
                payload: response.data
            });
        })
        .catch(
            error => {
                console.log('Error:', error); // Verifica si hay algún error
                dispatch({
                    type: ERROR,
                });
            }
        );
    }   
}

export const getAllTemperament = () => {
    // Obtengo todos los temperamentos de mi back
    return (dispatch) => {
        axios("http://localhost:3001/temperaments") //trae todos los temperamentos
        .then(response => { //mapeo los datos de la api
            dispatch({type: GET_ALL_TEMPERAMENT, payload: response.data}) //dispatcheo el array de temperamentos
        })
    }
}

export const getDescription = (id) => {
    // Enviar el id al reducere para crear la seccion de Description
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch ({
                type: GET_DESCRIPTION,
                payload: json.data
            })
        }
        catch(error) {
            return dispatch ({
                type: ERROR,
            })
        }
    }
}

export const getDogsForName = (name) => {
    //obtener todos los perros que coincidan con el nombre que pasamos por parametro
    try {
        return {
            type: GET_DOGS_FOR_NAME,
            payload: name
        }
    } catch (error) {
        alert("Error al obtener los perros por nombre")
        
    }
}

export const postDog = (data) => {
    return async function (dispatch) {
        try {
            const res = await axios.post(`http://localhost:3001/dogs`, data);
            return res;
        } catch (error) {
            return dispatch ({
                type: ERROR,
            })
        }
    };
};

export const deleteDog = (id) => {
    return async function (dispatch) {
        try {
            await axios.delete(`http://localhost:3001/deleted/${id}`);
            return dispatch({
                type: DELETE_DOG,
        });
        } catch (e) {
            return dispatch({
                type: ERROR,
        });
        }
    };
};

export function setLoading ()  {
    return { type: SET_LOADING };
};
export function setError ()  {
    return { type: ERROR };
};

export function getClean () {
    return{
        type: GET_CLEAN,
        payload: []
    }
}

// Filers


export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload: payload
    }
}

export function orderByWeight(payload){
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export const filterTemperament = (temperament) => {
    return {
        type: FILTER_TEMPERAMENT,
        payload: temperament
    }
}
export function filterCreated(payload){ 
    return {    
        type: FILTER_CREATED,
        payload
    }
}