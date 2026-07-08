import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="max-w-md mx-auto mb-8 px-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-purple-50 border-2 border-purple-200 text-purple-950 placeholder-purple-400 py-3 pl-5 pr-12 rounded-full focus:outline-none focus:border-purple-500 font-medium transition-colors shadow-sm"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none">
          🔍
        </div>
      </div>
    </div>
  );
}

export default SearchBar;