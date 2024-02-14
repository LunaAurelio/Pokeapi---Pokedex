import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons, nameFilter, typeFilter }) => {
  const filteredPokemons = pokemons.filter(pokemon => {
    const nameMatches = !nameFilter || pokemon.name.toLowerCase().includes(nameFilter.toLowerCase());
    
    const typeMatches = !typeFilter || (pokemon.types && pokemon.types.some(type => type?.toLowerCase().includes(typeFilter.toLowerCase())));

    console.log('Pokemon:', pokemon.name, 'Name Matches:', nameMatches, 'Type Matches:', typeMatches);

    return nameMatches && typeMatches;
  });

  return (
    <div className="pokemon-list">
      {filteredPokemons.length === 0 ? (
        <p>No se encontró ningún Pokémon.</p>
      ) : (
        filteredPokemons.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))
      )}
    </div>
  );
};

export default PokemonList;
