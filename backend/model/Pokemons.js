import mongoose, { mongo } from "mongoose";

/*
 * we will just have this collection to hold all pokemons instances in general
 * Since Pokemon already creates a unique _id key, we will just use this collection's 
 *  _id as unique identifier for the pokemon instance. 
 */
const PokemonsSchema = new mongoose.Schema(
    { 
        name: {
            type: String,
            required: [true, "Pokemon Name Required"]
        }
    }
);

export default mongoose.model("Pokemon", PokemonsSchema);