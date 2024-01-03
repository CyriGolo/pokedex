let pokemons = [];
let div = document.querySelector('#list')
let input = document.querySelector('.search')
let pokeInfo = document.querySelector('aside')
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

fetch('https://pokeapi.co/api/v2/pokemon/?limit=500')
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
      let type = document.createElement('h5')
      let typeName = pokemons[i - 1].types[j];
      type.textContent = typeName
      type.style.backgroundColor = typeColors[typeName]
      document.getElementById(pokemons[i - 1].name).appendChild(type)
    }
  }
  input.disabled = false;
  const loadingDiv = document.querySelector('#loading');
  loadingDiv.classList.add('hideLoading');
  loadingDiv.classList.replace('hideLoading', 'hide');
  document.body.style.overflow = 'unset';
  pokemonClick();
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


function pokemonClick() {
  let pokemonList = document.querySelectorAll('.pokemon');
  for(let i = 0; i<pokemonList.length; i++) {
    pokemonList[i].addEventListener('click',()=>{
      pokeInfo.style.marginLeft = "80vw"
      fetch('https://pokeapi.co/api/v2/pokemon/' + (i + 1))
      .then(response => response.json())
      .then(data =>{
        fetch('https://pokeapi.co/api/v2/pokemon-species/' + (i + 1))
        .then(response => response.json())
        .then(dataSpec =>{
          fetch(dataSpec.evolution_chain.url)
          .then(response => response.json())
          .then(evoChain =>{
            let img = new Image();
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${i+1}.gif`;
            img.onload = function() {
              pokeInfo.innerHTML=`
              <img height="${img.height * 3}px"src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${i+1}.gif'>
              <p class="number">N°${i + 1}</p>
              <h2>${data.name}</h2>
              <div id="typeFocus" class="type"></div>
              <h3>Pokedex Entry</h3>
              <p class="desc">${dataSpec.flavor_text_entries[0].flavor_text.replace('', ' ')}
              <div class="size">
                <div class="descSpect">
                  <h3>Height</h3>
                  <p class="statDesc">${data.height / 10}m</p>
                </div>
                <div class="descSpect">
                  <h3>Weight</h3>
                  <p class="statDesc">${data.weight / 10}kg</p>
                </div>
              </div>
              <h3>Abilite(s)</h3>
              <div class="abis">
                <p class="statDesc abi">${data.abilities[0].ability.name}</p>
              </div>
              <h3>Stats</h3>
              <div class="stats">
                <div class="stat">
                  <div style="background-color:#DF2140">HP</div>
                  <p>${data.stats[0].base_stat}</p>
                </div>
                <div class="stat">
                  <div style="background-color:#FF994D">ATK</div>
                  <p>${data.stats[1].base_stat}</p>
                </div>
                <div class="stat">
                  <div style="background-color:#eecd3d">DEF</div>
                  <p>${data.stats[2].base_stat}</p>
                </div>
                <div class="stat">
                  <div style="background-color:#85DDFF">SpA</div>
                  <p>${data.stats[3].base_stat}</p>
                </div>
                <div class="stat">
                  <div style="background-color:#96da83">SpD</div>
                  <p>${data.stats[4].base_stat}</p>
                </div>
                <div class="stat">
                  <div style="background-color:#FB94A8">SPD</div>
                  <p>${data.stats[5].base_stat}</p>
                </div>
                <div class="stat">
                  <div style="background-color:#7195DC">TOT</div>
                  <p>${data.stats[0].base_stat + data.stats[1].base_stat + data.stats[2].base_stat + data.stats[3].base_stat + data.stats[4].base_stat + data.stats[5].base_stat}<p>
                </div>
              </div>
              <h3>Evolution(s)</h3>
              <div class="evolution"></div>
              `
              if(data.abilities.length == 2) {
                document.querySelector('.abis').innerHTML += `
                <p class="statDesc abi">${data.abilities[1].ability.name}</p>`
              }
              let evo = []
              let evoDiv = document.querySelector('.evolution');
              evo.push([evoChain.chain.species.name, parseInt(evoChain.chain.species.url.split('/').filter(Boolean).pop())])
              if(evoChain.chain.evolves_to.length == 1){
                evo.push([evoChain.chain.evolves_to[0].species.name, parseInt(evoChain.chain.evolves_to[0].species.url.split('/').filter(Boolean).pop()), evoChain.chain.evolves_to[0].evolution_details[0].min_level])
                if(evoChain.chain.evolves_to[0].evolves_to.length == 1){
                  evo.push([evoChain.chain.evolves_to[0].evolves_to[0].species.name, parseInt(evoChain.chain.evolves_to[0].evolves_to[0].species.url.split('/').filter(Boolean).pop()), evoChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level])
                }
              }
              for(let i = 0;i<evo.length;i++) {
                if(evo[i].length == 3) {
                  if(evo[i][2] == null) {
                    evoDiv.innerHTML += `<p>?</p>`
                  } else {
                    evoDiv.innerHTML += `<p>Lv.${evo[i][2]}</p>`
                  }
                }
                evoDiv.innerHTML += `<img class="evo" id="${evo[i][1]}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo[i][1]}.png">`
              }
              let evos = document.querySelectorAll('.evo')
              for(let i = 0;i<evos.length;i++) {
                evos[i].addEventListener('click',()=>{
                  document.querySelectorAll('.pokemon')[evos[i].id - 1].click()
                })
              }
              pokeInfo.style.marginLeft = "0";
              for(let j = 0; j<pokemons[i].types.length; j++) {
                let type = document.createElement('h5')
                let typeName = pokemons[i].types[j];
                type.textContent = typeName
                type.style.backgroundColor = typeColors[typeName]
                document.getElementById('typeFocus').appendChild(type)
              }
            };
          })
        })
        .catch(error => {
          console.error('Error fetching dataSpec:', error);
        })
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
    })
  }
}

