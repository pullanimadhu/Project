const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

btnRules.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
  });
  btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
  });



// const buttonContainer = document.querySelector('.button-container');
// const nextButton = document.querySelector('.next-btn');