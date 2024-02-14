import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import "./PokemonDetails.css";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonDetails(data);

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        const englishDescription = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );

        setDescription(
          englishDescription ? englishDescription.flavor_text : ""
        );
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div className="pokemon-details">
        <Link to="/">Atrás</Link>
        <div>
          <h2>{pokemonDetails.name}</h2>
          <p>
            {" "}
            <span>ID:</span> {pokemonDetails.id}
          </p>
          <img
            src={pokemonDetails.sprites?.front_default}
            alt={pokemonDetails.name}
          />
          <p>
            <span>Description:</span> {description}
          </p>
        </div>
        <div>
          
          <p>
            <span>Type: </span>
            {pokemonDetails.types.map((type) => type.type.name).join(", ")}
          </p>
          <p>

            <span>Height:</span> {pokemonDetails.height / 10} m
          </p>
          <p>
            <span>Weight:</span> {pokemonDetails.weight / 10} kg
          </p>
          <p>
            <span>Abilities: </span>
            {pokemonDetails.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
          <p>
            <span>Base Experience:</span> {pokemonDetails.base_experience}
          </p>
          <p>
            <span>Stats:</span>
          </p>
          <ul>
            {pokemonDetails.stats.map((stat) => (
              <li key={stat.stat.name}>
                <em>{stat.stat.name}:</em> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
