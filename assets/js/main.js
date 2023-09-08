const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
let total = 10;
const detailWindow = document.getElementById("detailWindow");
const mainWindow = document.getElementById("mainWindow");
let bgColor;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="poke${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function createPokemonDetailHtml(pokemon) {
    return `
        <div class="newWindow ${pokemon.type}">
            <section class="pokemonBasic">
                <span class="back"><----</span>
                <div class="basicInformation">
                    <div class="pokemonName">
                        ${pokemon.name}
                    </div>
                    <span class="pokemonId">
                        #${pokemon.number}
                    </span>
                    <ul class="sectionList pokemonList">
                        ${pokemon.types.map((type) => `<li class="pokemonItem ${type}">${type}</li>`).join(' ')}
                    </ul>
                </div>
            </section>
            <section class="detalhes">
                <div class="pokemonImage">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <ul class="sectionList menu">
                    <li class="menuItem" id="about">About</li>
                    <li class="menuItem" id="stats">Base Stats</li>
                    <li class="menuItem">Evolution</li>
                    <li class="menuItem">Moves</li>
                </ul>
                <div class="teste">
                    <hr class="linha">
                    <div class="marcadorLinhaAbout" id="linhaAzul"></div>
                </div>
                <table class="tabela" id="aboutTable">
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Base Experience
                        </td>
                        <td>
                            ${pokemon.baseExperience}
                        </td>
                    </tr>
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Height
                        </td>
                        <td>
                            ${pokemon.height * 10} cm
                        </td>
                    </tr>
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Weight
                        </td>
                        <td>
                            ${pokemon.weight / 10} kg
                        </td>
                    </tr>
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Abilities
                        </td>
                        <td >
                            ${pokemon.abilities.map((ability) => " " + ability )}
                        </td>
                    </tr>
                </table>
                    <table class="tabela hide" id="statsTable">
                    <tr class="linhaTabela">
                        <td class="descricao">
                            HP
                        </td>
                        <td>
                            ${pokemon.hp}
                        </td>
                        <td>
                            <div class="linhaStatus"></div>
                            <div class="corLinhaStatus ${(pokemon.hp < 50) ? "linhaVermelha" : "linhaVerde"}"  style="width:${pokemon.hp * 53 / 100}vw;"></div>
                        </td>
                    </tr>
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Attack
                        </td>
                        <td>
                            ${pokemon.attack}
                        </td>
                        <td>
                            <div class="linhaStatus"></div>
                            <div class="corLinhaStatus ${(pokemon.attack < 50) ? "linhaVermelha" : "linhaVerde"}"  style="width:${pokemon.attack * 53 / 100}vw;"></div>
                        </td>
                    </tr>
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Defense
                        </td>
                        <td>
                            ${pokemon.defense}
                        </td>
                        <td>
                            <div class="linhaStatus"></div>
                            <div class="corLinhaStatus ${(pokemon.defense < 50) ? "linhaVermelha" : "linhaVerde"}"  style="width:${pokemon.defense * 53 / 100}vw;"></div>
                        </td>
                    </tr>
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Sp. Atk
                        </td>
                        <td >
                            ${pokemon.specialAttack}
                        </td>
                        <td>
                            <div class="linhaStatus"></div>
                            <div class="corLinhaStatus ${(pokemon.specialAttack < 50) ? "linhaVermelha" : "linhaVerde"}"  style="width:${pokemon.specialAttack * 53 / 100}vw;"></div>
                        </td>
                    </tr>
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Sp. Def
                        </td>
                        <td >
                            ${pokemon.specialDefense}
                        </td>
                        <td>
                            <div class="linhaStatus"></div>
                            <div class="corLinhaStatus ${(pokemon.specialDefense < 50) ? "linhaVermelha" : "linhaVerde"}"  style="width:${pokemon.specialDefense * 53 / 100}vw;"></div>
                        </td>
                    </tr>
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Speed
                        </td>
                        <td >
                            ${pokemon.speed}
                        </td>
                        <td>
                            <div class="linhaStatus"></div>
                            <div class="corLinhaStatus ${(pokemon.speed < 50) ? "linhaVermelha" : "linhaVerde"}"  style="width:${pokemon.speed * 53 / 100}vw;"></div>
                        </td>
                    </tr>
                    <tr class="linhaTabela">
                        <td class="descricao">
                            Total
                        </td>
                        <td >
                            ${pokemon.total}
                        </td>
                        <td>
                            <div class="linhaStatus"></div>
                            <div class="corLinhaStatus ${(pokemon.total < 300) ? "linhaVermelha" : "linhaVerde"}"  style="width:${pokemon.total * 53 / 600}vw;"></div>
                        </td>
                    </tr>
                </table>
            </section>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit
    total += limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

document.addEventListener("click", (e) => {
    for(let i = 1; i <= total; i++) {
        if( e.target.closest(`#poke${i}`)){
            loadPokemonDetails(i);  
        }
    }
})

document.addEventListener("click", (e) =>{
    if( e.target.closest(".back") ) {
        backToMainWindow();
    }
})

document.addEventListener("click", (e) => {
    const aboutTable = document.getElementById("aboutTable");
    const statsTable = document.getElementById("statsTable");
    const linhaAzul = document.getElementById("linhaAzul");
    if( e.target.closest("#stats") ) {
        aboutTable.classList.add("hide");
        statsTable.classList.remove("hide");
        linhaAzul.classList.replace("marcadorLinhaAbout", "marcadorLinhaStats")
    }else if( e.target.closest("#about") ){
        statsTable.classList.add("hide");
        aboutTable.classList.remove("hide");
        linhaAzul.classList.replace("marcadorLinhaStats", "marcadorLinhaAbout")
    }
});


function loadPokemonDetails(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => response.json())
        .then((jsonBody) => convertPokeApiDetailToPokemonDetail(jsonBody))
        .then((results) => {
            bgColor = results.type;
            document.body.classList.add(results.type)
            mainWindow.classList.add("hide")
            detailWindow.classList.remove("hide")
            detailWindow.innerHTML = createPokemonDetailHtml(results)
        })
}

function backToMainWindow(){
    detailWindow.classList.add("hide");
    document.body.classList.remove(bgColor);
    mainWindow.classList.remove("hide");
}