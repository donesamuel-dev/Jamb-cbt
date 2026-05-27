const questionBank = {
  english: [
    {q: "He is ______ intelligent to fail the test.", options: ["too", "so", "very", "quite"], answer: 0, explanation: "'Too intelligent to fail' means his intelligence prevents failure."},
    {q: "Choose the opposite of 'Generous'.", options: ["Kind", "Selfish", "Rich", "Poor"], answer: 1, explanation: "Generous means giving freely, opposite is selfish."},
    {q: "The teacher asked us to ______ the book.", options: ["read", "readed", "reading", "reads"], answer: 0, explanation: "Use base form after 'to'."},
    {q: "Choose the word with the same vowel sound as 'seat'.", options: ["Set", "Sit", "Seat", "Sate"], answer: 2, explanation: "'Seat' has a long /i:/ sound."},
    {q: "Identify the correct plural of 'child'.", options: ["Childs", "Children", "Childes", "Childen"], answer: 1, explanation: "Irregular plural of child is children."},
    {q: "The man was ______ of stealing.", options: ["accused", "charged", "blamed", "convicted"], answer: 0, explanation: "You are accused OF something."},
    {q: "Choose the correct sentence.", options: ["He don't like rice.", "He doesn't likes rice.", "He doesn't like rice.", "He don't likes rice."], answer: 2, explanation: "Subject-verb agreement: He doesn't like."},
    {q: "What is the synonym of 'Brave'?", options: ["Coward", "Fearful", "Courageous", "Weak"], answer: 2, explanation: "Courageous means brave."},
    {q: "I would have passed if I ______ harder.", options: ["study", "studied", "had studied", "have studied"], answer: 2, explanation: "Third conditional uses had studied."},
    {q: "Choose the correctly spelt word.", options: ["Accomodate", "Accommodate", "Acommodate", "Accomodate"], answer: 1, explanation: "Double 'c' and double 'm'."},
    {q: "He is good ______ Mathematics.", options: ["in", "at", "on", "for"], answer: 1, explanation: "Good AT is correct collocation."},
    {q: "The opposite of 'Advance' is ______.", options: ["Progress", "Retreat", "Move", "Go"], answer: 1, explanation: "Retreat means to go back."},
    {q: "Choose the word that is nearest in meaning to 'Huge'.", options: ["Tiny", "Small", "Large", "Enormous"], answer: 3, explanation: "Enormous is closest to huge."},
    {q: "She said, 'I am coming.' Change to indirect speech.", options: ["She said that she was coming.", "She said that I am coming.", "She said that she is coming.", "She said that I was coming."], answer: 0, explanation: "Tense shifts back in reported speech."},
    {q: "Choose the correct question tag: He came late, ______?", options: ["didn't he", "did he", "doesn't he", "does he"], answer: 0, explanation: "Positive statement takes negative tag."},
    {q: "The students ______ the answer before the teacher came.", options: ["find", "found", "had found", "have found"], answer: 2, explanation: "Past perfect for action before another past action."},
    {q: "Identify the figure of speech: 'Time is money'.", options: ["Simile", "Metaphor", "Personification", "Hyperbole"], answer: 1, explanation: "Direct comparison without 'like' or 'as'."},
    {q: "Choose the correct spelling.", options: ["Neccessary", "Necessary", "Necessarry", "Necesary"], answer: 1, explanation: "One 'c', double 's'."},
    {q: "He ______ to school every day.", options: ["go", "goes", "going", "gone"], answer: 1, explanation: "He takes 'goes' in present simple."},
    {q: "What part of speech is 'Quickly'?", options: ["Noun", "Adjective", "Adverb", "Verb"], answer: 2, explanation: "Quickly modifies a verb, so it's an adverb."}
  ],
  maths: [{q: "2 + 2 x 2 =?", options: ["6", "8", "4", "10"], answer: 0, explanation: "BODMAS: 2 x 2 = 4, then 2 + 4 = 6."}],
  physics: [{q: "Unit of Force is:", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2, explanation: "Force is measured in Newtons."}]
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

function restart() {
  timeLeft = 3600;
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
}
