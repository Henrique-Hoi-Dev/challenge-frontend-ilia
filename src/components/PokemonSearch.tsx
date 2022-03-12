import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'

import '../styles/search.scss'
import Pokemon from "../interfaces/Search.interface";


const PokemonSearch: React.FC = () => {

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const [inputName, setInputName] = React.useState('vespiquen');

  const pokemonRef: React.RefObject<HTMLInputElement> = React.createRef();
  const onSearchHandler = (): void => {
    if (pokemonRef.current !== null) {
      setInputName(pokemonRef.current.value.toLowerCase());
    }
  };
  
  useEffect(() => {
    setLoading(true);
    setError("");
    axios.get(`https://pokeapi.co/api/v2/pokemon/${inputName}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);

        setPokemon(
          {
            name: response.data.name,
            base_experience: response.data.base_experience,
            imageURL: response.data.sprites.front_default,
            numberOfAbilities: response.data.abilities.length,
          },
        );
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [inputName]);

  return (
    <div  className="search">
      <h1>Por favor, digite o nome do pokémon abaixo</h1>
      <div className="input">
        <input type="text"  ref={pokemonRef} />
        <button className="btn" onClick={() => onSearchHandler()} >
          Buscar...
        </button>
      </div>

      {loading && <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
      {error && <div>{error}</div>}
      {pokemon &&
        <div  className="pokemon">
          <img src={pokemon.imageURL} alt="pokemon-pic" />
          <h2>{pokemon.name}</h2>
          <p>Base EXP: {pokemon.base_experience}</p>
          <p>Habilidades: {pokemon.numberOfAbilities}</p>
        </div>}
    </div>
  );
};

export default PokemonSearch;
