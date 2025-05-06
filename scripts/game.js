// Import question bank
import questionBank from './questions.js';

// Global variables
let currentAgeGroup = '';
let currentDifficulty = '';
let currentScore = 0;
let currentLevel = 1;
let timeLeft = 60;
let timer;
let currentQuestions = [];
let currentQuestionIndex = 0;
let highScore = localStorage.getItem('grammarRushHighScore') || 0;

// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startBtn = document.getElementById('start-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const scoreDisplay = document.getElementById('score-display');
    const timeDisplay = document.getElementById('time-display');
    const levelDisplay = document.getElementById('level-display');
    const finalScoreDisplay = document.getElementById('final-score');
    const highScoreDisplay = document.getElementById('high-score');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const rewardMessage = document.getElementById('reward-message');

    // Screens
    const selectionScreen = document.getElementById('selection-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');

    // Initialize high score display
    highScoreDisplay.textContent = highScore;

    // Event listeners for age buttons
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.addEventListener('click', () => selectAgeGroup(btn.dataset.value));
    });
    
    // Event listeners for difficulty buttons
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', () => selectDifficulty(btn.dataset.value));
    });
    
    // Start button event
    startBtn.addEventListener('click', startGame);
    
    // Play again button event
    playAgainBtn.addEventListener('click', () => {
        showScreen(selectionScreen);
    });

    // Game state management functions
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
        if (currentAgeGroup && currentDifficulty) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
    }

    // Game screens management
    function showScreen(screen) {
        // Hide all screens
        selectionScreen.classList.remove('active');
        gameScreen.classList.remove('active');
        resultScreen.classList.remove('active');
        
        // Show the requested screen
        screen.classList.add('active');
    }

    // Game initialization and logic
    function startGame() {
        // Reset game state
        currentScore = 0;
        currentLevel = 1;
        timeLeft = 60;
        
        // Update UI
        scoreDisplay.textContent = currentScore;
        levelDisplay.textContent = currentLevel;
        timeDisplay.textContent = timeLeft + 's';
        
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
        if (currentQuestions.length === 0) {
            // No questions available
            endGame();
            return;
        }
        
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
            highScoreDisplay.textContent = highScore;
        }
    }

    function levelUp() {
        currentLevel++;
        levelDisplay.textContent = currentLevel;
        timeLeft += 30; // Bonus time for leveling up
        timeDisplay.textContent = timeLeft + 's';
        showReward('Level Up! +30 seconds');
        loadQuestions(); // Get new questions
        loadQuestion();
    }

    function startTimer() {
        clearInterval(timer); // Clear any existing timer
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft + 's';
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        // Stop the timer
        clearInterval(timer);
        
        // Update final score display
        finalScoreDisplay.textContent = currentScore;
        highScoreDisplay.textContent = highScore;
        
        // Show result screen
        showScreen(resultScreen);
    }

    function showReward(message) {
        if (rewardMessage) {
            rewardMessage.textContent = message;
            rewardMessage.classList.add('show');
            
            setTimeout(() => {
                rewardMessage.classList.remove('show');
            }, 1500);
        }
    }
});

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