import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {
  const renderPokemons = () => {
    if (pokemons.length === 0) {
      return <p>No se encontró ningún Pokémon.</p>;
    }

    return pokemons.map((pokemon) => (
      <PokemonCard key={pokemon.name} pokemon={pokemon} />
    ));
  };

  return <div className="pokemon-list">{renderPokemons()}</div>;
};

export default PokemonList;
