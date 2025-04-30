const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const container = document.querySelector('.container');
const homeSection = document.querySelector('.home');
const questionText = document.querySelector('.question-text');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');

let counter;
let counterTime = 15; 
let timerElement = document.createElement("div");

let score = 0;
let questionCount = 0;
let selectedQuestions = [];

startBtn.onclick = () => {
  popupInfo.classList.add('active');
  main.classList.add('active');
};

exitBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
};

continueBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  homeSection.classList.add('hide');
  container.style.width = '100%';
  quizSection.classList.add('active');
  quizBox.classList.add('active');
  hideNavbar();

  questionCount = 0;
  score = 0;

  selectedQuestions = getRandomQuestions(questions, 10);
  showQuestions(questionCount);
};


function getRandomQuestions(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

nextBtn.onclick = () => {
  if (questionCount < selectedQuestions.length - 1) {
    questionCount++;
    showQuestions(questionCount);
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
};

function showQuestions(index) {
  questionText.textContent = `${index + 1}. ${selectedQuestions[index].question}`;
  let optionTag = `
    <div class="option"><span>${selectedQuestions[index].options[0]}</span></div>
    <div class="option"><span>${selectedQuestions[index].options[1]}</span></div>
    <div class="option"><span>${selectedQuestions[index].options[2]}</span></div>
    <div class="option"><span>${selectedQuestions[index].options[3]}</span></div>
  `;
  optionList.innerHTML = optionTag;

  const options = optionList.querySelectorAll(".option");
  options.forEach(option => {
    option.addEventListener("click", () => optionSelected(option));
  });

  document.querySelector(".question-progress").textContent = `${questionCount + 1} of ${selectedQuestions.length} Questions`;

  startTimer(counterTime);
  if (!quizBox.querySelector(".timer")) {
    timerElement.className = "timer";
    quizBox.prepend(timerElement);
  }

  quizBox.classList.remove("fade-in");
  void quizBox.offsetWidth;
  quizBox.classList.add("fade-in");

}

function optionSelected(answer) {
  clearInterval(counter);

  let userAnswer = answer.textContent.trim();
  let correctAnswer = selectedQuestions[questionCount].answer.trim();
  const allOptions = optionList.children.length;

  if (userAnswer === correctAnswer) {
    answer.classList.add("correct");
    score++;
  } else {
    answer.classList.add("incorrect");

    for (let i = 0; i < allOptions; i++) {
      const option = optionList.children[i];
      const optionSpanText = option.querySelector("span").textContent.trim();
      if (optionSpanText === correctAnswer) {
        option.classList.add("correct");
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.style.display = "block";
}

function startTimer(time) {
  clearInterval(counter);
  counter = setInterval(() => {
    timerElement.textContent = `Time Left: ${time}s`;

    if (time <= 5) {
      timerElement.style.color = "red";
    } else {
      timerElement.style.color = "yellow";
    }

    time--;

    if (time < 0) {
      clearInterval(counter);
      timeOut();
    }
  }, 1000);
}

function timeOut() {
  const correctAnswer = selectedQuestions[questionCount].answer.trim();
  const allOptions = optionList.children.length;

  for (let i = 0; i < allOptions; i++) {
    if (optionList.children[i].textContent.trim() === correctAnswer) {
      optionList.children[i].classList.add("correct");
    } else {
      optionList.children[i].classList.add("disabled");
    }
  }

  nextBtn.style.display = "block";
}

function showResult() {
  const totalQuestions = selectedQuestions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  let resultText = "";
  let stars = "";

  if (percentage >= 80) {
    resultText = "🎉 Excellent!";
    stars = "⭐⭐⭐";
  } else if (percentage >= 50) {
    resultText = "👍 Good Job!";
    stars = "⭐⭐";
  } else {
    resultText = "📚 Needs Improvement";
    stars = "⭐";
  }

  quizBox.className = "";
  quizBox.innerHTML = `
    <div class="result-box fade-in">
      <h2>Quiz Completed!</h2>
      <div class="result-text">${resultText}</div>
      <p class="score-text">Score: ${score} / ${totalQuestions} (${percentage}%)</p>
      <div class="stars">${stars}</div>
      <button onclick="location.reload()">Retry Quiz</button>
    </div>
  `;
  
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

$(document).ready(function(){
  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1900,
    speed: 800,
    arrows: false,
    dots: true,
    fade: true,
    cssEase: 'linear',
    vertical: false
  });
});


new WOW().init();

document.addEventListener("DOMContentLoaded", function() {
  const exitQuizBtn = document.querySelector(".exit-quiz-btn");
  if(exitQuizBtn) {
    exitQuizBtn.addEventListener("click", function(){
      showNavbar();
      location.reload();
    });
  }
});


const header = document.querySelector(".header");

function hideNavbar() {
  if(header) {
    header.style.display = "none";
  }
}

function showNavbar() {
  if(header) {
    header.style.display = "flex";
  }
}




