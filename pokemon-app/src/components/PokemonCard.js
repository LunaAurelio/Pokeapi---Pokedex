import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon: { name, types } }) => {
  const [id, setId] = useState(null);
  const [type, setType] = useState("Unknown");
  const [generation, setGeneration] = useState("Unknown");
  const [imageUrl, setImageUrl] = useState(null);
  const [cardColor, setCardColor] = useState("#ffffff");

  useEffect(() => {
    const fetchPokemonId = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setId(data.id);
        setImageUrl(data.sprites?.front_default);
        setType(data.types.map((type) => type.type.name).join(", "));
        setCardColor(getColorForType(data.types[0]?.type.name));
      } catch (error) {
        console.error("Error fetching Pokémon ID:", error);
      }
    };

    fetchPokemonId();
  }, [name]);

  useEffect(() => {
    if (!id) return;

    const fetchPokemonData = async () => {
      try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const pokemonData = await pokemonResponse.json();

        const speciesUrl = pokemonData.species.url;
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();

        setGeneration(speciesData.generation?.name || "Unknown");
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, [id]);

  const getColorForType = (pokemonType) => {
    switch (pokemonType) {
      case "normal":
        return "#8d8d77";
      case "fire":
        return "#f57417";
      case "water":
        return "#6890F0";
      case "electric":
        return "#F8D030";
      case "grass":
        return "#7cd64f";
      case "ice":
        return "#98D8D8";
      case "fighting":
        return "#C03028";
      case "poison":
        return "#A040A0";
      case "ground":
        return "#e6bc75";
      case "flying":
        return "#A890F0";
      case "psychic":
        return "#F85888";
      case "bug":
        return "#8e9c1a";
      case "rock":
        return "#B8A038";
      case "ghost":
        return "#705898";
      case "dragon":
        return "#7038F8";
      case "dark":
        return "#705848";
      case "steel":
        return "#B8B8D0";
      case "fairy":
        return "#EE99AC";
      default:
        return "#ffffff";
    }
  };

  return (
    <Link to={`/pokemon/${id}`} className="pokemon-card" style={{ backgroundColor: cardColor }}>
      <div>
        <p>#{id}</p>
        <h3>{name}</h3>
        {imageUrl && <img src={imageUrl} alt={`Image of ${name}`} />}
        <p>
          <em>Type:</em> {type}
        </p>
        <p>
          <em>Generation:</em> {generation}
        </p>
      </div>
    </Link>
  );
};

export default PokemonCard;