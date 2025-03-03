import PokemonMoves from "../model/PokemonMoves.js";

const getPokemonMoves = async (req, res) => {
    try {
        let {pokemon_id} = req.params;
        const allPokemonMoves = await PokemonMoves.find({pokemon_instance_id: pokemon_id});
        res.status(200).json({allPokemonMoves, count: allPokemonMoves.length});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const addNewMoveForPokemon = async (req, res) => {
    try {
        let {pokemon_id} = req.params;
        let {move_name} = req.body;

        if (!pokemon_id || !move_name) {
            return res.status(400).json({msg: "Both Pokemon ID and Move Name are required."});
        }
        const newMove = await PokemonMoves.create({
            name: move_name,
            pokemon_instance_id: pokemon_id
        });
        res.status(201).json({newMove, msg: "Successfully created new move for pokemon."});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const editMove = async (req, res) => {
    try {
        let {move_id} = req.params;
        const updatedMove = await PokemonMoves.findOneAndUpdate({_id: move_id}, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedMove) {
            return res.status(404).json({msg: `Move with ID ${move_id} not found.`});
        }
        res.status(200).json({msg: "Successfully Updated Pokemon Move"});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
};

const deleteMove = async (req, res) => {
    try {
        let {move_id} = req.params;
        const removedMove = await PokemonMoves.findOneAndDelete({_id: move_id});
        if (!removedMove) {
            return req.status(404).json({msg: `Move with ID ${move_id} not found.`});
        }
        res.status(200).json({msg: "Successfully removed Pokemon Move"});
    }
    catch (err) {
        res.status(500).json({msg: err});
    }
}

export {
    getPokemonMoves,
    addNewMoveForPokemon, 
    editMove,
    deleteMove
};