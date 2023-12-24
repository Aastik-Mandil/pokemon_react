import React from "react";
import CustomDialog from "./CustomDialog";
import { Typography } from "@mui/material";

function PokemonDetDialog({ pokemonDet, setPokemonsDet }) {
  const imgUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDet?.id}.svg`;

  let maximum =
    pokemonDet?.stats?.reduce(
      (acc, curr) => Math.max(acc, curr?.base_stat),
      0
    ) + 100;

  return (
    <CustomDialog
      title={pokemonDet?.name}
      open={pokemonDet}
      onClose={() => {
        setPokemonsDet(null);
      }}
      scroll="paper"
      dialogActions={null}
    >
      <div className="flex items-center justify-between p-6 gap-2">
        <img
          src={imgUrl}
          alt="image"
          className="w-[100px] object-contain"
        />

        <div className="flex flex-col gap-2">
          {pokemonDet?.stats?.map((stat, ind) => {
            var val = Math.floor(
              (stat?.base_stat / maximum) * 100
            );
            return (
              <div
                className="flex gap-2 items-center"
                key={ind}
              >
                <Typography className="!text-[12px] !font-bold capitalize !text-right w-[100%]">
                  {stat?.stat?.name?.replaceAll("-", " ")}
                </Typography>

                <Typography className="!text-[12px] !font-bold">
                  {stat?.base_stat}
                </Typography>

                <div
                  style={{ width: `${maximum}px` }}
                  className={`bg-[#e5e5e5] rounded-md h-[10px] relative`}
                >
                  <div
                    style={{ width: `${val}px` }}
                    className={`h-[100%] bg-[#6d6868] z-5`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CustomDialog>
  );
}

export default PokemonDetDialog;
