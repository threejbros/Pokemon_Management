import mongoose from "mongoose";

const PokemonMovesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Pokemon Name Required"]
        },
        pokemon_instance_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Pokemon Instance ID Required"]

        }
    }
);

export default mongoose.model("PokemonMove", PokemonMovesSchema);