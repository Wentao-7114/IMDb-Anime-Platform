import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ data, setFilteredData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
    const filteredData = data.filter((animes) => {
      return animes.title.value.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredData);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Enter an Anime Name..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;