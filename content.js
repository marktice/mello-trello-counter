/**
 * Displays the hidden element for showing number of cards in each list
 *  NOTE: so... seems there is already an element to display number of cards in a list it's just hidden
 *        can't find anyway to toggle this on in trello so why is it here?
 */
function displayElementForNumberOfCardsInEachList() {
  var hiddenNumberOfCardsElements = document.querySelectorAll(
    ".list-header-num-cards.hide.js-num-cards"
  );
  if (hiddenNumberOfCardsElements.length > 0) {
    hiddenNumberOfCardsElements.forEach((element) => {
      element.classList.remove("hide");
    });
  }
}

/**
 * Display value from number of cards in list and number currently visible due to filtering
 * @param {Int} numberOfCards
 * @param {Int} numberOfVisibleCards
 * @returns {String}
 */
function numberOfCardsText(numberOfCards, numberOfVisibleCards) {
  if (numberOfCards == numberOfVisibleCards) {
    return `${numberOfCards} cards`;
  }
  return `${numberOfVisibleCards}/${numberOfCards} cards`;
}

/**
 * Updates the text in each list for number of cards
 */
function updateNumberOfCardsText() {
  var lists = document.querySelectorAll(".js-list.list-wrapper");

  lists.forEach((list) => {
    var cards = list.querySelectorAll(".list-card");
    var visibleCards = list.querySelectorAll(".list-card:not(.hide)");

    list.querySelector(
      ".list-header-num-cards.js-num-cards"
    ).textContent = numberOfCardsText(cards.length, visibleCards.length);
  });
}

function handleTabUpdated() {
  displayElementForNumberOfCardsInEachList();
  updateNumberOfCardsText();
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "TabUpdated") {
    handleTabUpdated();
  }
});
