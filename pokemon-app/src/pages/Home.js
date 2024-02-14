import React, { useState, useEffect } from "react";
import { getPokemonList } from "../services/api";
import PokemonList from "../components/PokemonList";
import Header from "../components/Header";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
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
        <input
          type="text"
          placeholder="Filter by type"
          value={typeFilter}
          onChange={handleTypeFilterChange}
        />
        <PokemonList pokemons={pokemonData} nameFilter={nameFilter} typeFilter={typeFilter} />
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Home;
