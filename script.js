const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonFoto = document.querySelector('.pokemon__image')
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const voltar = document.querySelector('.btn-prev');
const proximo = document.querySelector('.btn-next');

async function pegarPokemon(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) throw new Error("Pokemón não encontrado");
    return response.json()
}

async function renderizarPokemon(pokemon) {
    try {
        const dados = await pegarPokemon(pokemon);
        pokemonName.innerHTML = '';
        pokemonName.innerHTML += dados.name;
        pokemonNumber.innerHTML = '';
        pokemonNumber.innerHTML += dados.id
        pokemonFoto.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
    catch (error) {
        pokemonName.innerHTML = "Não encontrado"
        pokemonNumber.innerHTML = '0'
        pokemonFoto.src = 'undefined.svg';
    }
}

renderizarPokemon(6);

voltar.addEventListener('click', async () => {
    let atualAnimal = Number(document.querySelector('.pokemon__number').textContent);
    if (atualAnimal > 1) {
        atualAnimal -= 1;
        await renderizarPokemon(atualAnimal);
    }
})

proximo.addEventListener('click', async () => {
    let atualAnimal = Number(document.querySelector('.pokemon__number').textContent);
    if (atualAnimal < 649) {
        atualAnimal += 1;
        await renderizarPokemon(atualAnimal);
    }
})

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await renderizarPokemon(input.value.toLowerCase());
})