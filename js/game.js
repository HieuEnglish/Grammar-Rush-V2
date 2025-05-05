let currentAgeGroup = '';
let currentDifficulty = '';
let currentScore = 0;
let currentLevel = 1;
let timeLeft = 60;
let timer;
let currentQuestions = [];
let currentQuestionIndex = 0;

// Game state management
function selectAgeGroup(ageGroup) {
    currentAgeGroup = ageGroup;
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    checkStartConditions();
}

function selectDifficulty(difficulty) {
    currentDifficulty = difficulty;
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    checkStartConditions();
}

function checkStartConditions() {
    const startBtn = document.getElementById('startBtn');
    startBtn.disabled = !(currentAgeGroup && currentDifficulty);
}

// Game initialization
function startGame() {
    currentScore = 0;
    currentLevel = 1;
    timeLeft = 60;
    currentQuestionIndex = 0;
    
    // Get questions for selected age group and difficulty
    currentQuestions = [...questionBank[currentAgeGroup][currentDifficulty]];
    shuffleArray(currentQuestions);

    // Update UI
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    document.getElementById('resultScreen').classList.add('hidden');
    
    updateScore();
    updateLevel();
    startTimer();
    displayQuestion();
}

// Timer management
function startTimer() {
    updateTimer();
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timerValue').textContent = timeLeft;
}

// Question display and handling
function displayQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        shuffleArray(currentQuestions);
        currentQuestionIndex = 0;
        currentLevel++;
        updateLevel();
    }

    const question = currentQuestions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    // Update progress bar
    const progress = (currentQuestionIndex / currentQuestions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function checkAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        updateScore(true);
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        updateScore(false);
    }

    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1000);
}

// Score management
function updateScore(correct = null) {
    if (correct === true) {
        currentScore += 10 * currentLevel;
    } else if (correct === false) {
        currentScore = Math.max(0, currentScore - 5);
    }
    document.getElementById('scoreValue').textContent = currentScore;
}

function updateLevel() {
    document.getElementById('levelValue').textContent = currentLevel;
}

// Game end handling
function endGame() {
    clearInterval(timer);
    
    const highScore = localStorage.getItem('highScore') || 0;
    if (currentScore > highScore) {
        localStorage.setItem('highScore', currentScore);
    }

    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');
    document.getElementById('finalScore').textContent = currentScore;
    document.getElementById('highScore').textContent = Math.max(highScore, currentScore);
}

function playAgain() {
    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById('welcomeScreen').classList.remove('hidden');
    currentAgeGroup = '';
    currentDifficulty = '';
    document.querySelectorAll('.age-btn, .diff-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('startBtn').disabled = true;
}

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}