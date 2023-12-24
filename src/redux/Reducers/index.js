import { combineReducers } from "redux";
import pokemonReducer from "./pokemonReducer";

const reducers = combineReducers({
  pokemonReducer: pokemonReducer,
});

export default reducers;
