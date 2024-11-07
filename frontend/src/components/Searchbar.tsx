import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher un équipement..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      className="border p-2 rounded w-64" // Réduire la largeur à 64
    />
  );
};

export default SearchBar;
