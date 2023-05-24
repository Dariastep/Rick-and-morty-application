import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
/* const maxPage = 1; */
let page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character?page=<pageIndex>"
    );
    if (response.ok) {
      const characters = await response.json();
      cardContainer.innerHTML = "";
      const charactersResults = await characters.results;
      const maxPage = characters.info.pages;
      pagination.textContent = `${page} / ${maxPage}`;

      console.log(characters);
      charactersResults.forEach((characterData) => {
        const characterCard = createCharacterCard(characterData);
        cardContainer.append(characterCard);
      });
    } else {
      console.log("Bad response");
    }
  } catch (error) {
    console.log(error.message);
  }
}

fetchCharacters();
