const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");
const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const playAgainBtn = document.querySelector(".play-again");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

// Retrieve the user and computer scores from local storage, or default to 0
let userScore = parseInt(localStorage.getItem('user-score')) || 0;
let aiscore = parseInt(localStorage.getItem('computer-score')) || 0;

// Update the scores in the UI during page load
updateScore();

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");

  updateScore();
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="src/images/hand-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    const buttonContainer = document.querySelector('.button-container');
    const nextButton = document.querySelector('.next-btn');
    const rulesButton = document.querySelector('.rules-btn');

    nextButton.style.display = 'none';
    rulesButton.style.display = 'inline-block';

    if (userWins) {
      resultText.innerHTML = '<p style="font-size: 30px; margin:0; letter-spacing:5px;">YOU WIN</p>'; 
      resultText.innerHTML += '<p style="font-size: 22px; margin:0; letter-spacing: 2px;">AGAINST PC</p>';   
      resultDivs[0].classList.toggle("winner");
      userScore++;

      nextButton.style.display = 'inline-block';
      rulesButton.style.display = 'inline-block';
      nextButton.style.order = 1;
      rulesButton.style.order = 2;
    } else if (aiWins) {
      resultText.innerHTML = '<P style="font-size: 30px; margin:0; letter-spacing: 5px;">YOU LOSE</P>';
      resultText.innerHTML += '<p style="font-size: 22px; margin:0; letter-spacing: 2px;">AGAINST PC</p>';
      resultDivs[1].classList.toggle("winner");
      aiscore++;
      nextButton.style.order = 2;
      rulesButton.style.order = 1;
    } else {
      resultText.innerText = "TIE UP";
      nextButton.style.order = 2;
      rulesButton.style.order = 1;
    }

    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");

    updateScore();
  }, 500);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function updateScore() {
  playerScore.innerText = userScore;
  computerScore.innerText = aiscore;

  // Save the scores to local storage
  localStorage.setItem('userScore', userScore);
  localStorage.setItem('computerScore', aiscore);
}

const nextButton = document.querySelector('.next-btn');
nextButton.addEventListener('click', () => {
  window.location.href = "index1.html";
});
