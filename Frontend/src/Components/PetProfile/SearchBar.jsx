import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSearch(query);
    setQuery(query);
  };

  return (
    <div className="searchBarContainer">
      <form  className="searchForm">
        <input
          type="text"
          placeholder="Search by breed or pet type..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="searchInput"
        />
        <button className="searchButton" onClick={handleSearch}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
