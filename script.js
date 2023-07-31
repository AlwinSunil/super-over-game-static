let batBtn = document.getElementById("bat");
let resetBtn = document.getElementById("reset");

let numberOfBalls = 0;

let team1score = 0;
let team2score = 0;

let team1wicket = 0;
let team2wicket = 0;

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

function updateValue(type, no, score) {
  if (type == "wicket") {
    const teamScoreElem = document.getElementById(`team${no}-wickets`);
    teamScoreElem.innerHTML = score;
  } else {
    const teamScoreElem = document.getElementById(`team${no}-score`);
    teamScoreElem.innerHTML = score;
  }
}

batBtn.addEventListener("click", () => {
  let randomNumber = Math.floor(Math.random() * 7) + 1;

  let ballElem = document.querySelectorAll(".balls");
  let scoreParaElem = document.createElement("p");

  if (numberOfBalls < 12) {
    strikeAudio.pause();
    strikeAudio.currentTime = 0;
    strikeAudio.play();

    if (randomNumber == 7) {
      scoreParaElem.innerText = "W";
      if (numberOfBalls < 6) {
        team1wicket = team1wicket + 1;
        updateValue("wicket", 1, team1wicket);
      } else {
        team2wicket = team2wicket + 1;
        updateValue("wicket", 2, team2wicket);
      }
    } else {
      scoreParaElem.innerText = randomNumber;
      if (numberOfBalls < 6) {
        team1score = team1score + randomNumber;
        updateValue("score", 1, team1score);
      } else {
        team2score = team2score + randomNumber;
        updateValue("score", 2, team2score);
      }
    }

    ballElem[numberOfBalls].appendChild(scoreParaElem);
  }

  numberOfBalls = numberOfBalls + 1;

  if (team1wicket === 2) {
    numberOfBalls = 6;
  } else if (team2wicket === 2) {
    numberOfBalls = 12;
  }

  if (numberOfBalls >= 12) {
    gameOverAudio.play();
    if (team1score > team2score) {
      alert("IND Won");
    } else if (team1score == team2score) {
      alert("Match is draw!");
    } else {
      alert("PAK Won");
    }
  }
});

resetBtn.addEventListener("click", () => {
  window.location.reload();
});
