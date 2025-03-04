import mongoose from "mongoose";

const TrainerPokemonSchema = new mongoose.Schema(
    {
        instance_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pokemon",
            required: [true, "Pokemon instance ID Required"]
        },
        trainer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trainer",
            required: [true, "Pokemon Trainer ID Required"]
        }
    }
);

export default mongoose.model("TrainerPokemon", TrainerPokemonSchema);