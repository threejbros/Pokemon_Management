import Trainers from "../model/Trainers.js";
import TrainerPokemon from "../model/TrainerPokemon.js";

const getAllTrainers = async (req, res) => {
    try {
        const allTrainers = await Trainers.find({});
        res.status(200).json({allTrainers, count: allTrainers.length});
    }
    catch (err) {
        res.status(500).json(({msg: err}));
    }
};

const createNewTrainer = async (req, res) => {
    try {
        const newTrainer = await Trainers.create(req.body); 
        res.status(201).json({newTrainer})
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const getSingleTrainer = async (req, res) => {
    try {
        let {trainer_id} = req.params;
        const specifiedTrainer = await Trainers.findOne({_id: trainer_id});
        if (!specifiedTrainer) {
            return res.status(404).json({msg: `No Trainer with the ID ${trainer_id} found.`});
        }
        res.status(200).json({specifiedTrainer});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
}

const editTrainer = async (req, res) => {
    try {
        let {trainer_id} = req.params;
        const updatedTrainer = await Trainers.findOneAndUpdate({_id: trainer_id}, req.body, {
            new: true, 
            runValidators: true
        });
        if (!updatedTrainer) {
            return res.status(404).json({msg: `No Trainer with the ID ${trainer_id} found.`});
        }
        res.status(200).json({msg: "Successfully updated Trainer"});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const removeTrainer = async (req, res) => {
    try {
        let {trainer_id} = req.params;
        const deletedTrainer = await Trainers.findOneAndDelete({_id: trainer_id});
        if(!deletedTrainer) {
            return res.status(404).json({msg: `No Trainer with the ID ${trainer_id} found.`});
        }
        res.status(200).json({msg: "Successfully deleted Trainer"});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const getTrainerForSpecificPokemon = async (req, res) => {
    try {
        let {pokemon_id} = req.params;
        const trainerPokemon = await TrainerPokemon.findOne({instance_id: pokemon_id});
        // if pokemon has no trainer then set trainer to be null and still provide a message. but since this is not an error we set 
        //  the status code to 200. 
        if(!trainerPokemon) {
            return res.status(200).json({trainer: null, msg: `Could not find Trainer because Pokemon with ID ${pokemon_id} not found`});
        }

        // Now that we have gotten the trainer id. let's get the actual trainer object
        const trainer = await Trainers.findOne({_id: trainerPokemon.trainer_id})
        if (!trainer) {
            return res.status(404).json({trainer: null, msg: `No Trainer with the ID ${trainerPokemon.trainer_id} found.`});
        }
        res.status(200).json({trainer, msg: 'Successfully found Trainer for specified Pokemon.'})
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

export {
    getAllTrainers,
    getSingleTrainer,
    createNewTrainer,
    editTrainer,
    removeTrainer, 
    getTrainerForSpecificPokemon
};
