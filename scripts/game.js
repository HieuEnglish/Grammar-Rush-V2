// Game state variables
let currentAgeGroup = '';
let currentDifficulty = '';
let currentScore = 0;
let currentLevel = 1;
let timeLeft = 60;
let timer;
let currentQuestions = [];
let currentQuestionIndex = 0;
let highScore = localStorage.getItem('grammarRushHighScore') || 0;

// DOM Elements
const startBtn = document.getElementById('startBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const scoreDisplay = document.getElementById('scoreValue');
const timeDisplay = document.getElementById('timerValue');
const levelDisplay = document.getElementById('levelValue');
const finalScoreDisplay = document.getElementById('finalScore');
const highScoreDisplay = document.getElementById('highScore');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const rewardMessage = document.getElementById('rewardMessage');

// Screens
const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');

// Game state management
function selectAgeGroup(ageGroup) {
    const clickedButton = document.querySelector(`.age-btn[data-value="${ageGroup}"]`);
    if (!clickedButton) return;

    if (currentAgeGroup === ageGroup) {
        // deselect
        currentAgeGroup = '';
        clickedButton.classList.remove('selected');
    } else {
        // select only this one
        currentAgeGroup = ageGroup;
        document.querySelectorAll('.age-btn').forEach(btn => btn.classList.remove('selected'));
        clickedButton.classList.add('selected');
    }
    checkStartConditions();
}

function selectDifficulty(difficulty) {
    const clickedButton = document.querySelector(`.diff-btn[data-value="${difficulty}"]`);
    if (!clickedButton) return;

    if (currentDifficulty === difficulty) {
        // deselect
        currentDifficulty = '';
        clickedButton.classList.remove('selected');
    } else {
        // select only this one
        currentDifficulty = difficulty;
        document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('selected'));
        clickedButton.classList.add('selected');
    }
    checkStartConditions();
}

function checkStartConditions() {
    startBtn.disabled = !(currentAgeGroup && currentDifficulty);
}

// Game screens management
function showScreen(screen) {
    // Hide all screens
    welcomeScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    
    // Show the requested screen
    screen.classList.add('active');
}

// Game initialization
function startGame() {
    // Reset game state
    currentScore = 0;
    currentLevel = 1;
    timeLeft = 60;
    
    // Update UI
    scoreDisplay.textContent = currentScore;
    levelDisplay.textContent = currentLevel;
    timeDisplay.textContent = timeLeft;
    
    // Load questions based on selections
    loadQuestions();
    
    // Show game screen
    showScreen(gameScreen);
    
    // Start the timer
    startTimer();
    
    // Load first question
    loadQuestion();
}

function loadQuestions() {
    // Get questions based on age group and difficulty
    if (questionBank[currentAgeGroup] && questionBank[currentAgeGroup][currentDifficulty]) {
        currentQuestions = [...questionBank[currentAgeGroup][currentDifficulty]];
        // Shuffle questions
        shuffleArray(currentQuestions);
        currentQuestionIndex = 0;
    } else {
        console.error('Questions not found for the selected age group and difficulty');
        currentQuestions = [];
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        // If we've run out of questions, level up and get more
        levelUp();
        return;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correctIndex) {
        // Correct answer
        buttons[selectedIndex].classList.add('correct');
        updateScore(10 * currentLevel);
        showReward('Correct! +' + (10 * currentLevel) + ' points');
    } else {
        // Wrong answer
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correctIndex].classList.add('correct');
        showReward('Wrong answer!');
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

function updateScore(points) {
    currentScore += points;
    scoreDisplay.textContent = currentScore;
    
    // Update high score if needed
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('grammarRushHighScore', highScore);
    }
}

function levelUp() {
    currentLevel++;
    levelDisplay.textContent = currentLevel;
    timeLeft += 30; // Bonus time for leveling up
    timeDisplay.textContent = timeLeft;
    showReward('Level Up! +30 seconds');
    loadQuestions(); // Get new questions
    loadQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    showScreen(resultScreen);
    finalScoreDisplay.textContent = currentScore;
    highScoreDisplay.textContent = highScore;
}

function showReward(message) {
    rewardMessage.textContent = message;
    rewardMessage.classList.add('show');
    setTimeout(() => rewardMessage.classList.remove('show'), 1500);
}

function playAgain() {
    showScreen(welcomeScreen);
    currentAgeGroup = '';
    currentDifficulty = '';
    document.querySelectorAll('.age-btn, .diff-btn').forEach(btn => btn.classList.remove('selected'));
    checkStartConditions();
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
}