import React, { useState, useEffect } from 'react';
import { API_URL } from './data/pokemonData';
import PokemonCard from './components/PokemonCard';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-purple-100 text-purple-950 p-6 font-sans">
      
      <header className="max-w-7xl mx-auto text-center pb-6 mb-8 border-b border-purple-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-purple-900">
          Pokédex
        </h1>
        <p className="text-purple-600 text-sm mt-1 font-medium tracking-wide">
          Busca, guarda y elimina a tu Pokémon favorito
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            
            <div className="relative w-16 h-16 bg-white rounded-full border-4 border-purple-950 overflow-hidden animate-spin shadow-md">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 border-b-4 border-purple-950"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-purple-950 rounded-full z-10"></div>
            </div>

            <p className="text-purple-700 font-bold text-sm uppercase tracking-widest animate-pulse font-mono">
              Cargando Pokédex...
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 bg-purple-50/50 p-6 rounded-2xl border border-purple-200/60">
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default App;