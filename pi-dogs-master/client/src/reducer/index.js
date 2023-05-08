import {
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENT,
    GET_DESCRIPTION,
    GET_CLEAN,
    GET_DOGS_FOR_NAME,
    FILTER_TEMPERAMENT,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    FILTER_CREATED,
    POST_DOG,
    DELETE_DOG,
    ADD_FAV,
    DELETE_FAV,
    SET_LOADING,
    ERROR
}
    from "../action-types/index";

// Estado inicial
const initialState = {
    allDogs: [], // Array de perros
    dogsFilter: [], // Array de perros filtrados
    temperamen: [],
    dogDescription: [],
    fav: [],
    loading: true,
    error: false,
}


// Reducer
const rootReducer = (state = initialState, action) => {
    let pj = []; // Array auxiliar para guardar los perros filtrados
    switch (action.type) {
        // Obtener todos los dogs tanto de la api como la base de datos
        case GET_ALL_DOGS:
            pj = action.payload; // Obtengo el array de dogs
            return {
                ...state, // Obtengo el estado actual
                allDogs: action.payload, // Obtengo el array de dogs
                dogsFilter: pj,  // Guardo el array de dogs filtrados
                loading: false,
            }

        case GET_ALL_TEMPERAMENT:
            return {
                ...state,
                temperamen: action.payload
            }

        case GET_DESCRIPTION:
            // obtener la descripcion de cada raza seleccionada
            return {
                ...state,
                dogDescription: action.payload,// Obtengo el perro seleccionado
                loading: false,
                error: false,
            }

        case POST_DOG:
            return { ...state };

        case DELETE_DOG:
            return { ...state };

        case ADD_FAV:
            return {
                ...state,
                fav: [...state.fav, action.payload],
            };
        case DELETE_FAV:
            return {
                ...state,
                fav: state.fav.filter((dog) => dog.id !== action.payload.id),
            };

        case GET_DOGS_FOR_NAME:
            // filtrar los perros por nombre
            pj = state.payload === ""// POSIBLE ERROR, DEBE SER ACTION Y NO STATE (VERIFICAR)
                ? state.allDogs
                : state.allDogs.filter(dog => dog.name.toLowerCase().includes(action.payload.toLowerCase())) // Obtengo el array de dogs filtrados
            return {
                ...state,
                dogsFilter: pj,
                loading: false,
            }

        case FILTER_TEMPERAMENT:
            pj = action.payload === "all"
            ? state.allDogs
            : state.allDogs.filter(dog => {
                if (!dog.temperament) return undefined; // si el perro no tiene temperamento no lo muestro
                // console.log("PROBANDO TEMPERAMENTO", dog.temperament.includes())
                return dog.temperament.includes(action.payload) // si el perro tiene temperamento y el temperamento es igual al que selecciono lo muestro
            })
                return {
                ...state,
                dogsFilter: pj
            }

            case ORDER_BY_NAME:
                // ordenar los perros por nombre
                pj= (state.allDogs + state.allDogs.filter(dog => dog.createdInBd))
                if (action.payload === "asc") {
                    pj = state.dogsFilter.sort((a, b) => {
                        const nameA = a.name.toLowerCase(); // convertir a.minúsculas para ignorar mayúsculas
                        const nameB = b.name.toLowerCase();
                        if (nameA < nameB) return -1; // si el nombre de a es menor que el de b, a va antes que b
                        if (nameA > nameB) return 1; // si el nombre de a es mayor que el de b, a va después que b
                        return 0;
                    })
                } else {
                    pj = state.dogsFilter.sort((a, b) => {
                        const nameA = a.name.toLowerCase(); // convertir a.minúsculas para ignorar mayúsculas
                        const nameB = b.name.toLowerCase();
                        if (nameA > nameB) return -1; // si el nombre de a es mayor que el de b, a va antes que b
                        if (nameA < nameB) return 1; // si el nombre de a es menor que el de b, a va después que b
                        return 0;
                    })
                }
                return {
                    ...state,
                    dogsFilter: pj
                }

        case ORDER_BY_WEIGHT:
            if (action.payload === "min") {
                pj = state.dogsFilter.sort((a, b) => {
                    if (a.weightMin < b.weightMin) return -1; // si el peso de a es menor que el de b, a va antes que b
                    if (a.weightMin > b.weightMin) return 1; // si el peso de a es mayor que el de b, a va despues que b
                    return 0;
                })
            } else {
                pj = state.dogsFilter.sort((a, b) => {
                    if (a.weightMin > b.weightMin) return -1; // si el peso de a es mayor que el de b, a va antes que b
                    if (a.weightMin < b.weightMin) return 1; // si el peso de a es menor que el de b, a va despues que b
                    return 0;
                })
            }

            return {
                ...state,
                dogsFilter: pj
            }

        case FILTER_CREATED:
            if (action.payload === "All") {
                pj = state.allDogs; // si el filtro es all, muestro todos los perros
            } else if (action.payload === "Exist") {
                pj = state.allDogs.filter(dog => !dog.createdInBd);
            } else {
                pj = state.allDogs.filter(dog => dog.createdInBd);
            }
            console.log("PROBANDO REDUCER", pj)
            return {
                ...state,
                dogsFilter: pj
            };

        case GET_CLEAN:
            // limpiar el estado
            return {
                ...state,
                dogDescription: action.payload
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };

        case ERROR:
            return {
                ...state,
                loading: false,
                error: !state.error,
            };
        default:
            return state; // Retorno el estado actual
    }
}


export default rootReducer;