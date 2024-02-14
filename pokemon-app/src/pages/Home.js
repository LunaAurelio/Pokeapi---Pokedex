import React, { useState, useEffect } from "react";
import { getPokemonList, getPokemonTypes, getPokemonGenerations } from "../services/api";
import PokemonList from "../components/PokemonList";
import Header from "../components/Header";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [allGenerations, setAllGenerations] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [minId, setMinId] = useState("");
  const [maxId, setMaxId] = useState("");

  const prevOffsetRef = React.useRef();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getPokemonList(20, offset);

      const pokemonDataWithDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const pokemonDetails = await response.json();
          
          return {
            ...pokemon,
            types: pokemonDetails.types.map((type) => type.type.name),
            generation: pokemonDetails.species.generation?.name || "Unknown",
            id: pokemonDetails.id,
          };
        })
      );

      setPokemonData((prevData) => [...prevData, ...pokemonDataWithDetails]);
      setLoading(false);
    };

    if (offset !== prevOffsetRef.current) {
      fetchData();
      prevOffsetRef.current = offset;
    }
  }, [offset]);

  useEffect(() => {
    const fetchTypes = async () => {
      const types = await getPokemonTypes();
      setAllTypes(types);
    };

    const fetchGenerations = async () => {
      const generations = await getPokemonGenerations();
      setAllGenerations(generations);
    };

    fetchTypes();
    fetchGenerations();
  }, []);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleTypeDropdownChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleGenerationDropdownChange = (event) => {
    setSelectedGeneration(event.target.value);
  };

  const handleMinIdChange = (event) => {
    setMinId(event.target.value);
  };

  const handleMaxIdChange = (event) => {
    setMaxId(event.target.value);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredPokemon = pokemonData.filter((pokemon) => {
    const nameMatches = pokemon.name.toLowerCase().includes(nameFilter.toLowerCase());
    const typeMatches = !selectedType || (Array.isArray(pokemon.types) && pokemon.types.includes(selectedType));
    const generationMatches = !selectedGeneration || pokemon.generation === selectedGeneration;
    const idMatches = (!minId || pokemon.id >= parseInt(minId, 10)) &&
                      (!maxId || pokemon.id <= parseInt(maxId, 10));

    return nameMatches && typeMatches && generationMatches && idMatches;
  });

  return (
    <div>
      <Header />
      <div className="div-home">
        <h1>PokéList</h1>
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
        <select value={selectedType} onChange={handleTypeDropdownChange}>
          <option value="">All Types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select value={selectedGeneration} onChange={handleGenerationDropdownChange}>
          <option value="">All Generations</option>
          {allGenerations.map((generation) => (
            <option key={generation.name} value={generation.name}>
              {generation.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Min ID"
          value={minId}
          onChange={handleMinIdChange}
        />
        <input
          type="text"
          placeholder="Max ID"
          value={maxId}
          onChange={handleMaxIdChange}
        />
        <PokemonList pokemons={filteredPokemon} />
        
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Home;
