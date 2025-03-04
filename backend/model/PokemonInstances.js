/*
 * Will not be using this anymore.
 */ 
import mongoose from "mongoose";

const PokemonInstancesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Pokemon Name Required"], 
            unique: true
        },
        type_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PokemonType",
            required: [true, "Pokemon Type ID Required"]
        },
        trainer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trainer",
            required: [true, "Pokemon Trainer ID Required"]
        }
    }
);

export default mongoose.model("PokemonInstance", PokemonInstancesSchema);