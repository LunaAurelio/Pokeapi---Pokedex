import React, { useState, useEffect } from "react";
import { getPokemonList, getPokemonTypes } from "../services/api";
import PokemonList from "../components/PokemonList";
import Header from "../components/Header";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState(null); // Asegúrate de haber inicializado typeFilter con el valor correcto;
  const [loading, setLoading] = useState(false);
  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const prevOffsetRef = React.useRef();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await getPokemonList(20, offset);
      setPokemonData((prevData) => [...prevData, ...data.results]);

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

    fetchTypes();
  }, []);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleTypeDropdownChange = (event) => {
    setSelectedType(event.target.value);
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
    const nameMatch = pokemon.name.toLowerCase().includes(nameFilter.toLowerCase());
    const typeMatch = selectedType ? (pokemon.types && pokemon.types.includes(selectedType)) : true;
    return nameMatch && typeMatch;
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
        <PokemonList pokemons={filteredPokemon}  nameFilter={nameFilter} typeFilter={typeFilter}/>
        
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Home;
