import { createCharacterCard } from "./components/card/card.js";
import {
  createNextButton,
  createPrevButton,
} from "./components/nav-button/nav-button.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";

//rendering
createSearchBar();
createPrevButton();
createPagination();
createNextButton();

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
export let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    if (response.ok) {
      const characters = await response.json();
      cardContainer.innerHTML = "";
      const charactersResults = await characters.results;
      maxPage = characters.info.pages;
      pagination.textContent = `${page} / ${maxPage}`;

      console.log(characters);
      charactersResults.forEach((characterData) => {
        const characterCard = createCharacterCard(characterData);
        cardContainer.append(characterCard);
        return characterData;
      });
    } else {
      console.log("Bad response");
    }
  } catch (error) {
    console.log(error.message);
  }
}

fetchCharacters();
// nextButton
nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

// previousButton
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

// searchBar   später noch INPUT !!!!
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; // unschön ab funzt
  const searchData = new FormData(event.target);
  const data = Object.fromEntries(searchData);
  searchQuery = data.query;
  fetchCharacters();
});
