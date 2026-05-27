const funFacts = [
  "JAMB started in 1978. You’re using tech they didn’t have back then 😎",
  "English has the highest failure rate. Don’t be that guy.",
  "Reading past questions 5 times > reading 10 textbooks once.",
  "JAMB usually repeats questions. Word for word sometimes.",
  "Most students fail because of time management, not difficulty.",
  "If you score 250+, you’re in the top 10% nationwide.",
  "Night reading works, but 5am revision sticks better.",
  "Calculator is allowed for Maths and Physics in JAMB CBT.",
  "The first 10 questions set the mood. Don’t panic if one is hard.",
  "Guessing on questions you don’t know gives you a 25% chance. Better than zero."
];

function showRandomFact() {
  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
  document.getElementById('fun-fact').innerText = fact;
}

// Show one on page load
window.onload = function() {
  showRandomFact();
}
