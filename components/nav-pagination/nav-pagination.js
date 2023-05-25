
const navigation = document.querySelector('[data-js="navigation"]');

export function createPagination() {
const pagination = document.createElement("span");
pagination.dataset.js = "pagination";
pagination.classList.add("navigation__pagination");
navigation.append(pagination);
}