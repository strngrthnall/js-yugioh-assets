const state = {
  score:{
    playerScore: 0,
    computerScore: 0,
    scoreBos: document.getElementById("score_points")
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type")
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card")
  },
  actions: {
    button: document.getElementById("next-duel")
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
    winOf: [2],
    loseOf: [0],
    type: "Rock"
  },
]

// const players = {
//   player1: "player-cards",
// }


function init() {


}

init()

