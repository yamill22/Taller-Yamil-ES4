import React, { useState, useEffect } from 'react';
import { API_URL } from './data/pokemonData';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import FavoritesSidebar from './components/FavoritesSidebar'; 

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('pokedex-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) {
          throw new Error('No se pudo conectar con la PokéAPI.');
        }

        const datos = await respuesta.json();
        setPokemonList(datos.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    localStorage.setItem('pokedex-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (pokemon) => {
    const isAlreadyFav = favorites.some((fav) => fav.name === pokemon.name);
    if (isAlreadyFav) {
      setFavorites(favorites.filter((fav) => fav.name !== pokemon.name));
    } else {
      setFavorites([...favorites, pokemon]);
    }
  };

  const handleRemoveFavorite = (pokemon) => {
    setFavorites(favorites.filter((fav) => fav.name !== pokemon.name));
  };

  const filteredPokemons = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-purple-100 text-purple-950 p-6 font-sans relative">
      
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg z-30 transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
        title="Ver Favoritos"
      >
        <span className="text-xl">⭐</span>
        {favorites.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center border-2 border-purple-100 animate-bounce">
            {favorites.length}
          </span>
        )}
      </button>

      <header className="max-w-7xl mx-auto text-center pb-6 mb-6 border-b border-purple-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-purple-900">
          Pokédex
        </h1>
        <p className="text-purple-600 text-sm mt-1 font-medium tracking-wide">
          Busca, guarda y elimina a tu Pokémon favorito
        </p>
      </header>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="max-w-7xl mx-auto">
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative w-16 h-16 bg-white rounded-full border-4 border-purple-950 overflow-hidden animate-spin shadow-md">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 border-b-4 border-purple-950"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-purple-950 rounded-full z-10"></div>
            </div>
            <p className="text-purple-700 font-bold text-sm uppercase tracking-widest animate-pulse font-mono">
              Invocando Pokémon...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-center max-w-md mx-auto mt-10 text-red-700">
            <p className="font-bold">⚠️ Error</p>
            <p className="text-xs font-mono mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredPokemons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-purple-500 font-medium text-lg">
                  No se encontraron Pokémon que coincidan con "{searchTerm}"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 bg-purple-50/50 p-6 rounded-2xl border border-purple-200/60">
                {filteredPokemons.map((pokemon) => {
                  const isFav = favorites.some((fav) => fav.name === pokemon.name);
                  
                  return (
                    <PokemonCard 
                      key={pokemon.name} 
                      pokemon={pokemon} 
                      isFavorite={isFav}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}

      </main>

      <FavoritesSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />

    </div>
  );
}

export default App;