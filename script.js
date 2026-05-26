const questionBank = {
  english: [
    {q: "He is ______ intelligent to fail the test.", options: ["too", "so", "very", "quite"], answer: 0, explanation: "'Too intelligent to fail' means his intelligence prevents failure."},
    {q: "Choose the opposite of 'Generous'.", options: ["Kind", "Selfish", "Rich", "Poor"], answer: 1, explanation: "Generous means giving freely, opposite is selfish."},
    {q: "The teacher asked us to ______ the book.", options: ["read", "readed", "reading", "reads"], answer: 0, explanation: "Use base form after 'to'."}
  ],
  maths: [
    {q: "2 + 2 x 2 =?", options: ["6", "8", "4", "10"], answer: 0, explanation: "BODMAS: 2 x 2 = 4, then 2 + 4 = 6."},
    {q: "What is 15% of 200?", options: ["30", "25", "20", "35"], answer: 0, explanation: "0.15 x 200 = 30."}
  ],
  physics: [
    {q: "Unit of Force is:", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2, explanation: "Force is measured in Newtons."}
  ]
};

let questions = [];
let current = 0;
let score = 0;
let userAnswers = [];
let timeLeft = 3600;
let timer;

function startTest(subject) {
  questions = [...questionBank[subject]];
  questions.sort(() => Math.random() - 0.5);

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  current = 0; score = 0; userAnswers = [];
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  if (current >= questions.length) {
    endTest();
    return;
  }

  let q = questions[current];
  document.getElementById("question").innerText = q.q;
  document.getElementById("q-counter").innerText = `Q${current+1}/${questions.length}`;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    optionsDiv.innerHTML += `<button onclick="selectOption(${i})" id="opt${i}">${opt}</button>`;
  });
}

function selectOption(i) {
  userAnswers[current] = i;
  document.querySelectorAll("#options button").forEach(btn => btn.classList.remove("selected"));
  document.getElementById(`opt${i}`).classList.add("selected");
}

function nextQuestion() {
  if (userAnswers[current] === undefined) {
    alert("Please select an answer");
    return;
  }
  if (userAnswers[current] === questions[current].answer) score++;
  current++;
  loadQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    let min = Math.floor(timeLeft/60);
    let sec = timeLeft%60;
    document.getElementById("timer").innerText = `${min}:${sec<10?'0':''}${sec}`;
    if (timeLeft <= 0) endTest();
  }, 1000);
}

function endTest() {
  clearInterval(timer);
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("score").innerText = `Score: ${score}/${questions.length} - ${Math.round(score/questions.length*100)}%`;
}

function reviewAnswers() {
  let reviewDiv = document.getElementById("review");
  reviewDiv.style.display = "block";
  reviewDiv.innerHTML = "";
  questions.forEach((q, i) => {
    let userAns = userAnswers[i];
    let isCorrect = userAns === q.answer;
    reviewDiv.innerHTML += `
      <div class="review-item ${isCorrect?'correct':'wrong'}">
        <p><b>Q${i+1}:</b> ${q.q}</p>
        <p>Your answer: ${q.options[userAns] || "Not answered"}</p>
        <p>Correct answer: ${q.options[q.answer]}</p>
        <p><i>${q.explanation}</i></p>
      </div>
    `;
  });
}

function restart() {
  timeLeft = 3600;
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
      }
