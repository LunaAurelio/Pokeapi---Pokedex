import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons, nameFilter, typeFilter }) => {
  const filteredPokemons = pokemons.filter((pokemon) => {
    // Verifica si el nombre coincide o si no hay filtro de nombre
    const nameMatches =
      !nameFilter ||
      pokemon.name.toLowerCase().includes(nameFilter.toLowerCase());

    // Verifica si al menos uno de los tipos coincide o si no hay filtro de tipo
    const typeMatches =
      !typeFilter ||
      (Array.isArray(pokemon.types) &&
        pokemon.types.some(
          (type) => type && type.toLowerCase().includes(typeFilter.toLowerCase())
        ));

    console.log('Pokemon:', pokemon.name, 'Name Matches:', nameMatches, 'Type Matches:', typeMatches);
    console.log('Type Filter:', typeFilter); // Agrega esta línea
    return nameMatches && typeMatches;
  });

  return (
    <div className="pokemon-list">
      {filteredPokemons.length === 0 ? (
        <p>No se encontró ningún Pokémon.</p>
      ) : (
        filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))
      )}
    </div>
  );
};

export default PokemonList;
