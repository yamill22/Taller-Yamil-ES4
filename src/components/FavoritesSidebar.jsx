import React from 'react';

function FavoritesSidebar({ isOpen, onClose, favorites, onRemoveFavorite }) {
  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-purple-950/25 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      <aside className={`fixed right-0 top-0 h-full w-80 bg-purple-50 border-l border-purple-200 shadow-2xl z-50 p-6 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        <div className="flex items-center justify-between border-b border-purple-200 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <h2 className="text-lg font-bold text-purple-900">Mis Favoritos</h2>
            <span className="bg-purple-200 text-purple-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {favorites.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-purple-400 hover:text-purple-700 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-purple-400">
              <p className="text-sm">Aún no has guardado ningún Pokémon.</p>
              <p className="text-xs mt-1">¡Haz clic en "Guardar"!</p>
            </div>
          ) : (
            favorites.map((pokemon) => {
              const pokemonId = pokemon.url.split('/')[6];
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

              return (
                <div 
                  key={pokemon.name} 
                  className="flex items-center justify-between bg-purple-200/40 border border-purple-200 p-3 rounded-xl gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={imageUrl} 
                      alt={pokemon.name} 
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-purple-950 capitalize">{pokemon.name}</h4>
                      <p className="text-[10px] text-purple-500 font-mono">#{pokemonId.padStart(3, '0')}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onRemoveFavorite(pokemon)}
                    className="text-purple-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Eliminar de favoritos"
                  >
                    🗑️
                  </button>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}

export default FavoritesSidebar;