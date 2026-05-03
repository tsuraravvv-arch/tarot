let cards = [];

const titleScreen = document.getElementById("titleScreen");
const drawScreen = document.getElementById("drawScreen");
const resultScreen = document.getElementById("resultScreen");

const oneCardButton = document.getElementById("oneCardButton");
const threeCardButton = document.getElementById("threeCardButton");
const drawButton = document.getElementById("drawButton");
const backToTitleButton = document.getElementById("backToTitleButton");
const againButton = document.getElementById("againButton");
const resultBackButton = document.getElementById("resultBackButton");

const resultCardImage = document.getElementById("resultCardImage");
const resultCardName = document.getElementById("resultCardName");
const resultKeywords = document.getElementById("resultKeywords");
const resultMessage = document.getElementById("resultMessage");

async function loadCards() {
  const response = await fetch("./cards.json");
  if (!response.ok) {
    throw new Error("cards.json を読み込めませんでした。");
  }
  cards = await response.json();
}

function showScreen(screen) {
  titleScreen.classList.add("hidden");
  drawScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");

  screen.classList.remove("hidden");
}

function drawOneCard() {
  if (!cards.length) return;

  const index = Math.floor(Math.random() * cards.length);
  const card = cards[index];

  resultCardImage.src = `./assets/cards/${card.image}`;
  resultCardImage.alt = `${card.name_ja} / ${card.name_en}`;

  resultCardName.textContent = `${card.number} ${card.name_en} / ${card.name_ja}`;
  resultKeywords.textContent = card.keywords.join("・");
  resultMessage.textContent = card.message_daily;

  showScreen(resultScreen);
}

oneCardButton.addEventListener("click", () => {
  showScreen(drawScreen);
});

threeCardButton.addEventListener("click", () => {
  alert("3枚占いは準備中です。まずは1枚占いで遊んでください。");
});

drawButton.addEventListener("click", () => {
  drawOneCard();
});

againButton.addEventListener("click", () => {
  showScreen(drawScreen);
});

backToTitleButton.addEventListener("click", () => {
  showScreen(titleScreen);
});

resultBackButton.addEventListener("click", () => {
  showScreen(titleScreen);
});

loadCards().catch((error) => {
  console.error(error);
  alert("カードデータの読み込みに失敗しました。cards.json の配置を確認してください。");
});