const express = require("express");
const router = express.Router();
const { Temperament, Dog }=require("../db");
const {getAllDogs, getApiInfo} = require("../controllers/dogControllers")
const imageDog = "https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2022/03/dog-glasses-2661411.jpg?tf=3840x"

router.get("/dogs", async (req, res) =>{ // ?name="el nombre"
    const name = req.query.name //se pide por query
    let dogsTotales = await getAllDogs()//trae todos los perros
    if(name){ //pregunta si hay un name por query
        let dogsName = await dogsTotales.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()))//para no tener problema con las mays y minus
        dogsName.length ?//encontraste el nombre?
        res.status(200).send(dogsName):
        res.status(404).send("No esta disponible");
    }else{   
        res.status(200).send(dogsTotales)//si no hay un query envia los perros totales
    }
})

router.post("/dogs", async(req, res)=>{// lo que requiere el body
    const { name, heightMax, heightMin, weightMax, weightMin, life_spanMax, life_spanMin, image, temperament } = req.body;
    let temperamentId = await Temperament.findOne({ // se fija si el temperamento esta en la bd
        where: { name: temperament }
    });
    let dogName = await getApiInfo().then((d) => d.find((d) => d.name === name)); // se fija si el nombre esta en la api
    // Creo el Dog

        if(!name || !heightMax || !heightMin || !weightMax || !weightMin || !temperament){
            res.status(400).send("Faltan datos"); 
        } else if (dogName){ // si el nombre esta en la api
            res.status(404).send("El nombre del perro ya existe"); // 404 porque el nombre ya existe
        } else if (heightMax < heightMin || weightMax < weightMin || life_spanMax < life_spanMin){
            res.status(400).send("Los datos minimos no pueden ser mayor a los datos maximos"); // 400 porque los datos son invalidos
        } else if (heightMax > 200 || heightMin < 0 || weightMax > 100 || weightMin < 0 || life_spanMax > 30 || life_spanMin < 0){
            res.status(400).send("Datos invalidos"); // 400 porque los datos son invalidos
        } else if (temperamentId === null){
            console.log(temperamentId)
            res.status(400).send("Temperamento invalido"); // 400 porque el temperamento es invalido
        } else {
            Dog.create({ 
                name: name,
                heightMin: parseInt(heightMin),
                heightMax: parseInt(heightMax),
                weightMin: parseInt(weightMin),
                weightMax: parseInt(weightMax),
                life_spanMax: parseInt(life_spanMax),
                life_spanMin: parseInt(life_spanMin),
                createdInBd: true,
                image: image || imageDog,
            })
            .then(async (dog) => {
                // Guardo el temperamento
                const temp = await Temperament.findAll({ // findOrCreate para que no se repita
                    where: { name: temperament }, // where para que solo se guarde el temperamento que se le pasa
                });
                // Guardo el Dog en el temperamento
                await dog.addTemperament(temp); // addTemperament es una funcion de sequelize que guarda el temperamento en el dog
                res.status(201).send(dog); // 201 porque se creo
            }).catch(err => err)
    
            res.send("Perro creado");
        }
    
})

router.get("/dogs/:id", async(req, res, next)=>{
    try {
        const id = req.params.id;//requiere parametro id
        const dogsTotales= await getAllDogs()//llama la funcion total de perros
        const dog = dogsTotales.find(ele => ele.id == id);//busca el perro por id

        if(!dog){
            res.status(404).send("No esta disponible");
        } else {
            res.status(200).send(dog);
        }
    } catch (error) {
        next(error);
    }
}) 

router.delete('/deleted/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const dog = await Dog.findByPk(id);
        if(!dog){
            res.status(404).send("No esta disponible");
        } else {
            await dog.destroy();
            res.status(200).send("Perro eliminado");
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;