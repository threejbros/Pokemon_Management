import express from 'express';
import {getAllTrainers, getSingleTrainer, createNewTrainer, editTrainer, removeTrainer, getTrainerForSpecificPokemon} from '../controllers/trainers.js';
import {getAllIndividualPokemons, createNewPokemon, getSinglePokemon, editPokemon, removePokemon, getAllPokemonForSpecifiedTrainer, addPokemonForTrainer} from '../controllers/pokemon.js';
import {getPokemonMoves, addNewMoveForPokemon, editMove, deleteMove} from '../controllers/pokemonMoves.js';

const router = express.Router();

/*
 * getAllTrainers -> return a list of all trainers
 * createNewTrainer -> create a new trainer
 */ 
router.route('/api/trainers')
    .get(getAllTrainers) 
    .post(createNewTrainer);

/*
 * getSingleTrainer -> get specified trainer
 * editTrainer -> to edit a specified trainer
 * removeTrainer -> to remove a specified trainer
 */ 
router.route('/api/trainers/:trainer_id')
    .get(getSingleTrainer)
    .patch(editTrainer)
    .delete(removeTrainer);

/*
 * getTrainerForSpecificPokemon -> get the trainer of the specified pokemon
 */
router.route('/api/trainers/pokemon/:pokemon_id')
    .get(getTrainerForSpecificPokemon)

/*
 * getAllIndividualPokemons -> retrieves all pokemon instances (whether or not they are assigned a trainer)
 * createNewPokemon -> create new unassigned-trainer pokemon
 */
router.route('/api/pokemons')
    .get(getAllIndividualPokemons)
    .post(createNewPokemon);

/*
 * removePokemon -> delete specified pokemon
 */
router.route('/api/pokemons/:pokemon_id')
    .get(getSinglePokemon)
    .patch(editPokemon)
    .delete(removePokemon);

/* 
 * getAllPokemonForSpecifiedTrainer -> retrieve all of a trainer's pokemons
 * addPokemonForTrainer -> add Pokemon to specified trainer
 */
router.route('/api/pokemons/trainers/:trainer_id')
    .get(getAllPokemonForSpecifiedTrainer)
    .post(addPokemonForTrainer);

// router.route('/api/pokemonstype/:type_id')
//     .get(getAllPokemonOfType);

// router.route('/api/pokemonstype')
//     .post(createNewPokemonType);

// router.route('/api/moves')
//     .get(getAllMoves);

/*
 * getPokemonMoves -> to get all the moves of a specific pokemon
 * addNewMoveForPokemon -> add new move for specified pokemon
 */
router.route('/api/moves/pokemon/:pokemon_id')
    .get(getPokemonMoves)
    .post(addNewMoveForPokemon);


/*
 * editMove -> edit specified move
 * deleteMove -> deleteSpecifiedMove
 */
router.route('/api/moves/:move_id')
    .patch(editMove)
    .delete(deleteMove);

export default router;