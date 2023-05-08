const axios=require("axios") 
const { Temperament, Dog }=require("../db");
const api = `https://api.thedogapi.com/v1/breeds/`;

// esta funcion llama toda la informacion que requiero de la api externa
const getApiInfo = async () => {  //funciones controladoras luego se llaman en las rutas
    const apiUrl=  await axios.get(api); //trae la info de la api
    //console.log(apiUrl) 
    const apiInfo = await apiUrl.data.map(p => { 
        let weightMin = parseInt(p.weight.metric.slice(0, 2).trim()); 
        let weightMax = parseInt(p.weight.metric.slice(4).trim());
        const heightMin = parseInt(p.height.metric.slice(0, 2).trim()); 
        const heightMax = parseInt(p.height.metric.slice(4).trim());
        const life_spanMin = parseInt(p.life_span.slice(0, 2).trim());
        const life_spanMax = parseInt(p.life_span.slice(4).trim()); 
        
        
    if (weightMin && weightMax) {
        weightMin = weightMin;
        weightMax = weightMax;
    } else if (weightMin && !weightMax) {
        weightMin = weightMin;
        weightMax = `${weightMin+2}`;
    } else if (!weightMin && weightMax) {
        weightMin = `${weightMax-2}`;
        weightMax = weightMax;
    } else {
        if (p.name === "Smooth Fox Terrier") {
            weightMin = 6;
            weightMax = 9;
        } else {
            weightMin = 20;
            weightMax = 30;
        }
    }  
        return {
            id: p.id,
            name: p.name,
            heightMin:heightMin,
            heightMax:heightMax,
            weightMin: weightMin,
            weightMax: weightMax,
            life_spanMin:life_spanMin,
            life_spanMax:life_spanMax,
            temperament:p.temperament,
            createdInBd: false,
            image:p.image.url,
        }   
    })
    return apiInfo
}
//console.log(apiInfo)
const getDbInfo= async ()=>{ //esta funcion trae la info de bd
    try {
        const dogs = await Dog.findAll({ //trae todos los perros de la bd
            include: Temperament, //trae los temperamentos de la bd
        });

        const info = dogs.map(dog => { //mapea los datos de la bd
            let temp = dog.temperaments.map(te => te.name); //trae los temperamentos de la bd
            let aux = temp.join(", "); //convierte el array de temperamentos en un string
            
            return {
                id: dog.id,
                name: dog.name,
                heightMin: parseInt(dog.heightMin),
                heightMax: parseInt(dog.heightMax),
                weightMin: parseInt(dog.weightMin),
                weightMax: parseInt(dog.weightMax),
                life_spanMin: parseInt(dog.life_spanMin),
                life_spanMax: parseInt(dog.life_spanMax),
                temperament: aux,
                createdInBd: true,
                image: dog.image
            };

        })

        return info;
    } catch (error) {
        console.log(error);
    }
}

const getAllDogs = async () =>{//esta funcion concatena los datos de la api y los de la bd
    const apiInfo = await getApiInfo(); //trae la info de la api
    const dbInfo = await getDbInfo() //trae la info de la bd
    const totalInfo = apiInfo.concat(dbInfo) //concatena la info de la api y la de la bd
    return totalInfo
}

module.exports = { 
    getAllDogs,
    getApiInfo,
}; //exporta la funcion para usarla en las rutas