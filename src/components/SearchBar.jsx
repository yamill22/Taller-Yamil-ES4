import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="max-w-md mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-purple-400 text-sm sm:text-base">
          🔍
        </span>
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-white border border-purple-200 rounded-xl text-sm text-purple-950 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-xs transition-all"
        />
      </div>
    </div>
  );
}

export default SearchBar;