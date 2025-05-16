const questions = [
  { q: "Choose the correct sentence:", options: ["She go to school.", "She goes to school."], answer: 1 },
  { q: "Which is correct?", options: ["He don't like apples.", "He doesn't like apples."], answer: 1 },
  { q: "Fill in the blank: They ___ playing.", options: ["is", "are"], answer: 1 },
  { q: "Choose the correct word: I ___ a book.", options: ["read", "reads"], answer: 0 },
  { q: "Which is correct?", options: ["We was happy.", "We were happy."], answer: 1 }
];

let current = 0;
let score = 0;

const gameDiv = document.getElementById('game');
const scoreDiv = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

function showQuestion() {
  if (current >= questions.length) {
    gameDiv.innerHTML = `<strong>Game Over!</strong><br>Your score: ${score}/${questions.length}`;
    scoreDiv.textContent = '';
    startBtn.textContent = 'Restart';
    startBtn.style.display = 'inline-block';
    return;
  }
  const q = questions[current];
  let html = `<div>${q.q}</div>`;
  q.options.forEach((opt, idx) => {
    html += `<button class='opt-btn' data-idx='${idx}'>${opt}</button> `;
  });
  gameDiv.innerHTML = html;
  scoreDiv.textContent = `Score: ${score}`;
  document.querySelectorAll('.opt-btn').forEach(btn => {
    btn.onclick = function() {
      if (parseInt(this.dataset.idx) === q.answer) {
        score++;
      }
      current++;
      showQuestion();
    };
  });
}

startBtn.onclick = function() {
  current = 0;
  score = 0;
  startBtn.style.display = 'none';
  showQuestion();
};