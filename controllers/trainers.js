import Trainers from "../model/Trainers.js";

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
}

export {
    getAllTrainers,
    getSingleTrainer,
    createNewTrainer,
    editTrainer,
    removeTrainer
};
