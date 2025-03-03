import Pokemon from "../model/Pokemons.js";
import TrainerPokemon from "../model/Trainer_Pokemon.js";

const getAllIndividualPokemons = async (req, res) => {
    try {
        const allPokemons = await Pokemon.find({});
        res.status(200).json({allPokemons, count: allPokemons.length});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const createNewPokemon = async (req, res) => {
    try {
        const newPokemon = await Pokemon.create(req.body);
        res.status(201).json({newPokemon});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const getSinglePokemon = async (req, res) => { 
    try {
        let {pokemon_id} = req.params;
        const specificPokemon = await Pokemon.findOne({_id: pokemon_id});
        if (!specificPokemon) {
            return res.status(404).json({msg: `Pokemon with ID ${pokemon_id} not found.`});
        }
        res.status(200).json({specificPokemon});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const editPokemon = async (req, res) => {
    try {
        let {pokemon_id} = req.params;
        const updatedPokemon = await Pokemon.findOneAndUpdate({_id: pokemon_id}, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedPokemon) {
            return res.status(404).json({msg: `Pokemon with ID ${pokemon_id} not  found.`});
        }
        res.status(200).json({msg: "Successfully Updated Pokemon"});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const removePokemon = async (req, res) => {
    try {
        let {pokemon_id} = req.params;
        // First, we check if the Pokemon exists in the Trainer_Pokemon collection. 
        // if it exists, delete it. if it doesn't then we continue on.
        const trainerPokemonRecord = await TrainerPokemon.findOneAndDelete({instance_id: pokemon_id});

        // Now delete pokemon from the Pokemon collection
        const removedPokemon = await Pokemon.findOneAndDelete({_id: pokemon_id});
        if (!removePokemon) {
            return res.status(400).json({msg: `Pokemon with ID ${pokemon_id} not found in Pokemon colleciton`});
        }
        res.status(200).json({msg: "Successfully Deleted Pokemon"});
    }
    catch (err) {   
        res.status(500).json({msg: err});
    }
};

const getAllPokemonForSpecifiedTrainer = async (req, res) => {
    try {
        let {trainer_id: trainerID} = req.params;
        // This gets all pokemons whose trainer has id trainerID AND populates the instance_id with the related
        //  Pokemon details from the Pokemon collection.
        const allTrainerPokemonRecords = await TrainerPokemon.find({trainer_id: trainerID}).populate("instance_id");
        // If this trainer has no Pokemons, then return an empty array and count = 0;
        if(allTrainerPokemonRecords.length === 0) {
            return res.status(200).json({allPokemonsWithSpecifiedTrainer: [], count: 0});
        }
        // This will retrieve only the individual valid Pokemon records 
        const allPokemonsWithSpecifiedTrainer = allTrainerPokemonRecords.map(record => record.instance_id);
        res.status(200).json({allPokemonsWithSpecifiedTrainer, count: allPokemonsWithSpecifiedTrainer.length});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const addPokemonForTrainer = async (req, res) => {
    try {
        let {trainer_id} = req.params;
        // Extract pokemon_id from request body
        let {pokemon_id} = req.body;

        if (!trainer_id || !pokemon_id) {
            res.status(400).json({msg: "Both Trainer ID and Pokemon ID are required"})
        }

        // Although we will have the frontend only give the option of pokemons with no trainer, we should still
        //  have a check for it on the backend side
        const existingRecord = await TrainerPokemon.findOne({instance_id: pokemon_id});
        if (existingRecord) {
            return res.status(400).json({msg: "This Pokemon already has an assigned Trainer."})
        }

        const newPokemonForTrainer = await TrainerPokemon.create({
            instance_id: pokemon_id,
            trainer_id
        });
        res.status(201).json({newPokemonForTrainer, msg: "Successfully Added Pokemon to this Trainer"});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
}

export {
    getAllIndividualPokemons,
    createNewPokemon,
    getSinglePokemon,
    editPokemon,
    removePokemon,
    getAllPokemonForSpecifiedTrainer,
    addPokemonForTrainer
};