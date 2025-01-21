const pokemonInput = document.querySelector('#pokemon-input');

async function getPokemonData(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert('Error fetching Pokémon data. Please try again.');
  }
}

function generatePokemonCard(pokemonData) {
  return `
    <div class="pokemon-card">
      <h2>${pokemonData.id}. ${pokemonData.name}</h2>
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
      <ul>
        ${pokemonData.stats
          .map(
            (stat) => `
          <li>${stat.base_stat} ${stat.stat.name}</li>
        `
          )
          .join('')}
      </ul>
    </div>
  `;
}

async function displayPokemonData(event) {
  if (event.key !== 'Enter') return;

  const pokemonName = pokemonInput.value.trim().toLowerCase();
  if (!pokemonName) {
    alert('Please enter a Pokémon name.');
    return;
  }

 
  document.getElementById('loading').style.display = 'block';

  const pokemonData = await getPokemonData(pokemonName);

  
  document.getElementById('loading').style.display = 'none';

  if (pokemonData) {
    document.getElementById('pokeDex').innerHTML =
      generatePokemonCard(pokemonData);
  }
}

pokemonInput.addEventListener('keyup', displayPokemonData);
