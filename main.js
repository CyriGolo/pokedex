let pokemons = [];
let div = document.querySelector('#list')
let input = document.querySelector('.search')

fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
.then(response => response.json())
.then(data =>{
  for (let i = 0; i < data.results.length; i++) {
    pokemons.push({
        id: i + 1,
        name: data.results[i].name,
        types: []
    });
  };
  getType()
})
.catch(error => {
  console.error('Error fetching data:', error);
})

function getType(){
  for(let i = 1; i<=18; i++){
    fetch('https://pokeapi.co/api/v2/type/' + i)
    .then(response => response.json())
    .then(data =>{
      for(let j = 0; j<data.pokemon.length; j++){
        let index = pokemons.map(x => x.name).indexOf(data.pokemon[j].pokemon.name)
        if(index >= 0) {
          // if(pokemons[index].type)
          pokemons[index].types.push(data.name);
        }
      } 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
  }
  setTimeout(() => {
    render()
  }, 1000);
}

function render(){
  const typeColors = {
    'normal': '#BCBCAC',
    'fighting': '#BC5442',
    'flying': '#669AFF',
    'poison': '#AB549A',
    'ground': '#DEBC54',
    'rock': '#BCAC66',
    'bug': '#ABBC1C',
    'ghost': '#6666BC',
    'steel': '#ABACBC',
    'fire': '#FF421C',
    'water': '#2F9AFF',
    'grass': '#78CD54',
    'electric': '#FFCD30',
    'psychic': '#FF549A',
    'ice': '#78DEFF',
    'dragon': '#7866EF',
    'dark': '#785442',
    'fairy': '#FFACFF',
    'shadow': '#0E2E4C'
  };
  for(let i = 1; i<(pokemons.length + 1);i++) {
    div.innerHTML += `
    <div class="pokemon"> 
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png">
      <p>N°${i}</p>
      <h2>${pokemons[i - 1].name}</h2>
      <div class="type" id="${pokemons[i - 1].name}"></div>
    </div>
    `
    for(let j = 0; j<pokemons[i - 1].types.length; j++) {
      let type = document.createElement('h3')
      let typeName = pokemons[i - 1].types[j];
      type.textContent = typeName
      type.style.backgroundColor = typeColors[typeName]
      document.getElementById(pokemons[i - 1].name).appendChild(type)
    }
  }
  input.disabled = false;
  const loadingDiv = document.querySelector('#loading');
  loadingDiv.classList.add('hideLoading');
  setTimeout(function() {
      loadingDiv.classList.replace('hideLoading', 'hide');
      document.body.style.overflow = 'unset';
  }, 500);
}


input.addEventListener('input', ()=> {
  let pokemonsClass = document.querySelectorAll('.pokemon')
  for(let i = 0; i < pokemons.length; i++){
      if(pokemons[i].name.includes(input.value.toLowerCase()) && input.value != "") {
        pokemonsClass[i].style.display = "flex"
      } else if(input.value == "") {
        pokemonsClass[i].style.display = "flex"
      } else {
        pokemonsClass[i].style.display = "none"
      }
  }
})