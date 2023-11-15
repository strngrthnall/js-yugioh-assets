const state = {
  score:{
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points")
  },
  cardSprites: {
    avatar: document.getElementById("card-img"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type")
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card")
  },
  actions: {
    button: document.getElementById("next-duel")
  },
  playerSides: {
    player1: "player-cards",
    player1Box: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBox: document.querySelector("#computer-cards")
  }
}

const pathImages = "./src/assets/icons/"

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    img: `${pathImages}dragon.png`,
    winOf: [1],
    loseOf: [2],
    type: "Scissor"
  },
  {
    id: 1,
    name: "Dark Magician",
    img: `${pathImages}magician.png`,
    winOf: [2],
    loseOf: [0],
    type: "Paper"
  },
  {
    id: 2,
    name: "Exodia",
    img: `${pathImages}exodia.png`,
    winOf: [0],
    loseOf: [1],
    type: "Rock"
  },
]

async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length) 
  return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px")
  cardImage.setAttribute("data-id", idCard)
  

  if(fieldSide === state.playerSides.player1) {
    for(let i = 0; i < cardData.length; i++) {
      if(idCard === cardData[i].id) {
        cardImage.setAttribute("src", cardData[i].img)
      }
      
    }
    cardImage.classList.add("card");
    cardImage.addEventListener("mouseover", () => {
      drawSelectedCard(idCard)
    })
    
    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"))
    })
  } else {
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png")
  }

  return cardImage
}

async function removeAllCardsImages() {
  let { computerBox, player1Box } = state.playerSides
  let imageElements = computerBox.querySelectorAll("img")
  imageElements.forEach((img) => {
    img.remove()
  })

  
  imageElements = player1Box.querySelectorAll("img")
  imageElements.forEach((img) => {
    img.remove()
  })
}

async function hideCardsDetails() {
  state.cardSprites.avatar.src = ""
  
  state.cardSprites.name.innerText = "Select"
  state.cardSprites.type.innerText = "a card"
}

async function setCardsField(cardId) {

  await removeAllCardsImages()

  let computerCardId = await getRandomCardId()

  await showHiddenCardFieldsImages(true);

  hideCardsDetails()

  await drawCardsInFields(cardId, computerCardId);

  let duelResults = await checkDuelResults(cardId, computerCardId)

  await updateScore()
  await drawButton(duelResults)
}



async function drawCardsInFields(cardId, computerCardId) {
  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function showHiddenCardFieldsImages(value) {
  if(value === true) {
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
  } else {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  }
}

async function drawButton(text) {
  state.actions.button.innerText = text
  state.actions.button.style.display = "block"
}

async function checkDuelResults(playerCardId, computerCardId) {
  let duelResults = "Draw"
  let playerCard = cardData[playerCardId];

  if(playerCard.winOf.includes(computerCardId)) {
    duelResults = "Win"
    state.score.playerScore++
  } else if(playerCard.loseOf.includes(computerCardId)) {
    duelResults = "Lose"
    state.score.computerScore++
  }

  await playAudio(duelResults)

  return duelResults
}

async function updateScore() {
  state.score.scoreBox.innerText = `Win : ${state.score.playerScore} Lose: ${state.score.computerScore}  ` 
}

async function drawSelectedCard(index) {
  state.cardSprites.avatar.src = cardData[index].img
  state.cardSprites.name.innerText = cardData[index].name
  state.cardSprites.type.innerText = `Attribute: ${cardData[index].type}`
}

async function drawCards(cardNumbers, fieldSide) {
  for(let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomCardId()
    const cardImage = await createCardImage(randomIdCard, fieldSide)

    document.getElementById(fieldSide).appendChild(cardImage)
  }
}

async function resetDuel() {
  state.cardSprites.avatar.src = ""
  state.actions.button.style.display = "none"

  state.fieldCards.player.style.display = "none"
  state.fieldCards.computer.style.display = "none"
  init()

}

async function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`)

  try {
    audio.play();
  } catch (error) {
    
  }
  
}

function init() {
  showHiddenCardFieldsImages(false);

  drawCards(5, state.playerSides.player1)
  drawCards(5, state.playerSides.computer)

  const bgm = document.getElementById("bgm")
  bgm.play()
}

init()

