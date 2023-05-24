const navigation = document.querySelector('[data-js="navigation"]');

export function createButton() {
  const prevButton = document.createElement("button");
  prevButton.classList.add("button", "button--prev");
  prevButton.dataset.js = "button-prev";
  prevButton.textContent = "previous";
  navigation.append(prevButton);
}
