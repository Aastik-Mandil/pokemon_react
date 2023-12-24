import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";

function PokemonCard({ pokemon, onClick = () => {} }) {
  const items = pokemon?.url?.split("/");
  const id = items?.[items?.length - 2];
  const imgUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;

  // const [pokemonTyes, setPokemonTypes] = useState([]);

  // useEffect(() => {}, [id]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        className="h-[120px] !rounded-md cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between gap-8 p-4">
          <div className="flex flex-col gap-2">
            <Typography className="!text-[14px] text-black !font-bold capitalize">
              {pokemon?.name}
            </Typography>

            {/* <Typography className="!text-[14px] text-black !font-bold capitalize">
              {id}
            </Typography> */}
          </div>

          <img
            src={imgUrl}
            alt="image"
            className="w-[50px] object-contain"
          />
        </div>
      </Paper>
    </Grid>
  );
}

export default PokemonCard;
