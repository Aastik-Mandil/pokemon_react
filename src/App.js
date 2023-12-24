import React, { useEffect, useState } from "react";
import {
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  getAllPokemon,
  getPokemonByType,
  getPokemonDetail,
  getTypes,
} from "./actions/pokemon";
import { useDispatch, useSelector } from "react-redux";
import { setPokemons } from "./redux/Reducers/pokemonReducer";
import PokemonCard from "./components/PokemonCard";
import PokemonDetDialog from "./components/PokemonDetDialog";
import CustomLoader from "./components/CustomLoader";

function App() {
  const dispatch = useDispatch();
  const { pokemons } = useSelector(
    (state) => state?.pokemonReducer
  );

  const [load, setLoad] = useState(false);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState(
    []
  );
  const [searchPokemon, setSearchPokemon] = useState("");
  const [selectedPokemonType, setSelectedPokemonType] =
    useState(null);
  const [pokemonDet, setPokemonDet] = useState(null);

  useEffect(() => {
    getTypes(
      (data) => {
        setPokemonTypes(data?.results);
      },
      (err) => {
        setPokemonTypes([]);
      }
    );
    if (!selectedPokemonType) {
      setLoad(true);
      getAllPokemon(
        (data) => {
          dispatch(setPokemons(data?.results || []));
          setFilteredPokemons(data?.results || []);
          setLoad(false);
        },
        (err) => {
          dispatch(setPokemons([]));
          setFilteredPokemons([]);
          setLoad(false);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedPokemonType) {
      filterPokemonByType();
    } else {
      setFilteredPokemons(pokemons || []);
    }
  }, [selectedPokemonType]);

  const filterPokemonByType = () => {
    setLoad(true);
    getPokemonByType(
      selectedPokemonType,
      (data) => {
        setFilteredPokemons(data || []);
        if (searchPokemon) {
          searchPokemons(data || []);
        }
        setLoad(false);
      },
      (err) => {
        setFilteredPokemons([]);
        setLoad(false);
      }
    );
  };

  const searchPokemons = (pokemonLists) => {
    let filterPokemonList = pokemonLists;
    if (searchPokemon) {
      filterPokemonList = filterPokemonList?.filter(
        (pokemon) =>
          pokemon?.name
            ?.trim()
            ?.toLowerCase()
            ?.includes(searchPokemon?.trim()?.toLowerCase())
      );
    }
    setFilteredPokemons(filterPokemonList);
  };

  return (
    <div className="w-[100vw] h-[100vh]">
      {/* Loading */}
      {load && <CustomLoader />}

      {/* Pokemon detail dislog */}
      {pokemonDet && (
        <PokemonDetDialog
          pokemonDet={pokemonDet}
          setPokemonsDet={setPokemonDet}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-12 w-[100%] h-[52px] sticky top-0 left-0 right-0 z-5 bg-white !px-20">
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search"
          value={searchPokemon}
          onChange={(e) => {
            if (e.keyCode === 13) {
              return;
            }
            setSearchPokemon(e.target.value);
            if (e.target.value === "") {
              if (selectedPokemonType) {
                filterPokemonByType();
                // searchPokemons(filteredPokemons);
              } else {
                setFilteredPokemons(pokemons);
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              if (selectedPokemonType) {
                // if (e.target.value === "") {
                filterPokemonByType();
                // } else {
                // searchPokemons(filteredPokemons);
                // }
              } else {
                searchPokemons(pokemons);
              }
            }
          }}
        />

        <Select
          className="w-[200px] capitalize"
          placeholder="Type"
          size="small"
          value={selectedPokemonType}
          onChange={(e) => {
            if (e.target.value === "All") {
              setSelectedPokemonType(null);
              searchPokemons(pokemons);
            } else {
              setSelectedPokemonType(e.target.value);
            }
          }}
        >
          <MenuItem value={"All"} className="capitalize">
            {"All"}
          </MenuItem>
          {pokemonTypes?.map((pokemonType) => (
            <MenuItem
              key={pokemonType?.name}
              value={pokemonType?.name}
              className="capitalize"
            >
              {pokemonType?.name}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* search list */}
      <Grid
        container
        spacing={2}
        className="overflow-auto !px-20"
        style={{
          height: "calc(100vh - 52px)",
        }}
      >
        {filteredPokemons?.map((filteredPokemon, ind) => (
          <PokemonCard
            key={ind}
            pokemon={filteredPokemon}
            onClick={() => {
              getPokemonDetail(
                filteredPokemon?.name,
                (data) => {
                  setPokemonDet(data);
                },
                (err) => {
                  setPokemonDet(null);
                }
              );
            }}
          />
        ))}
      </Grid>
    </div>
  );
}

export default App;
