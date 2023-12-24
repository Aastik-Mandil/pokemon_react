export const PokemonBaseUrl = `https://pokeapi.co/api/v2`;

export const doAjax = (url, headers, method, body) => {
  let oHeader = {
    ...headers,
  };
  let param = {};
  if (body) {
    param = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...oHeader,
      },
      body: JSON.stringify(body),
    };
  } else {
    param = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...oHeader,
      },
    };
  }
  return fetch(url, param).then((res) => res.json());
};
