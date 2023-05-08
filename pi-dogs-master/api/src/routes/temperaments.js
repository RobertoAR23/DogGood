const express = require("express");
const axios=require("axios") 
const router = express.Router();
const { Temperament }=require("../db");
const api = `https://api.thedogapi.com/v1/breeds/`;

router.get("/temperaments", async(req,res)=>{
    const tempApi = await axios(api);
    const tempDB = tempApi.data
        .map((t) => t.temperament) //creo muchos arreglos con las palabras
        .toString() // las convierto a string
        .split(",") // las separo por comas
        .map((t) => t.trim()) // las quito los espacios
        .filter((t) => t.length > 1) // las quito las palabras que tienen una longitud de 1
    const filtro = tempDB.filter((t) => t); // por cada temperamento lo guardo separado
    let tempFilt = [...new Set(filtro)]; // hago un nuevo array con los temperamentos que tenia guardados y los nuevos, si se repiten se quitan

    tempFilt.forEach((t) => {
        // se fija si el temperamento esta, si esta no hace nada, si no lo crea
        Temperament.findOrCreate({ // se fija si el temperamento esta, si esta no hace nada, si no lo crea
            where: { name: t }, // se fija si el temperamento esta en la bd
        });
    });

    const totalTemp = await Temperament.findAll(); // findAll trae todos los temperamentos de la bd
    res.json(tempDB);
})

module.exports = router;