import { PokemonBaseUrl, doAjax } from ".";

export const getTypes = (fSuccess, fError) => {
  doAjax(`${PokemonBaseUrl}/type`, {}, "GET", null)
    .then((data) => {
      fSuccess(data);
    })
    .catch((err) => {
      fError(err);
    });
};

export const getAllPokemon = (fSuccess, fError) => {
  doAjax(
    `${PokemonBaseUrl}/pokemon?offset=0&limit=10000`,
    {},
    "GET",
    null
  )
    .then((data) => {
      fSuccess(data);
    })
    .catch((err) => {
      fError(err);
    });
};

export const getPokemonDetail = (
  name,
  fSuccess,
  fError
) => {
  doAjax(
    `${PokemonBaseUrl}/pokemon/${name}`,
    {},
    "GET",
    null
  )
    .then((data) => {
      fSuccess(data);
    })
    .catch((err) => {
      fError(err);
    });
};

export const getPokemonByType = (
  type,
  fSuccess,
  fError
) => {
  doAjax(`${PokemonBaseUrl}/type/${type}`, {}, "GET", null)
    .then((data) => {
      fSuccess(
        data?.pokemon?.map((p) => ({
          name: p?.pokemon?.name,
          url: p?.pokemon?.url,
        }))
      );
    })
    .catch((err) => {
      fError(err);
    });
};
