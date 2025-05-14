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

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Game class
export class Game {
    constructor() {
        this.score = 0;
        this.timer = null;
        this.timeLeft = 60;
        this.currentQuestion = null;
        this.ageGroup = null;
        this.difficulty = null;
    }

    initialize(ageGroup, difficulty) {
        this.ageGroup = ageGroup;
        this.difficulty = difficulty;
        this.score = 0;
        this.timeLeft = 60;
    }

    startTimer(callback) {
        this.timer = setInterval(() => {
            this.timeLeft--;
            callback(this.timeLeft);
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    endGame() {
        clearInterval(this.timer);
        return this.score;
    }

    updateScore(isCorrect) {
        const points = this.difficulty === 'easy' ? 1 :
                      this.difficulty === 'medium' ? 2 : 3;
        this.score += isCorrect ? points : 0;
        return this.score;
    }

    async getQuestion() {
        // Temporary test questions
        const questions = {
            kids: {
                easy: [
                    {
                        question: "Which is correct?",
                        options: ["I am going", "I is going", "Me going", "Me am going"],
                        correct: 0
                    }
                ]
            }
        };
        
        const categoryQuestions = questions[this.ageGroup]?.[this.difficulty] || [];
        this.currentQuestion = categoryQuestions[0];
        return this.currentQuestion;
    }

    checkAnswer(selectedIndex) {
        const isCorrect = selectedIndex === this.currentQuestion.correct;
        this.updateScore(isCorrect);
        return isCorrect;
    }
}

// Initialize game elements and state
export function initializeGame(ageGroup, difficulty) {
    // Set game parameters
    currentAgeGroup = ageGroup;
    currentDifficulty = difficulty;
    
    // Initialize DOM Elements
    const scoreDisplay = document.getElementById('score-display');
    const timeDisplay = document.getElementById('time-display');
    const levelDisplay = document.getElementById('level-display');
    const finalScoreDisplay = document.getElementById('final-score');
    const highScoreDisplay = document.getElementById('high-score');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const rewardMessage = document.getElementById('reward-message');

    // Initialize screens
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');

    // Start the game
    startGame();

    // Initialize high score display
    highScoreDisplay.textContent = highScore;

    // Redundant event listeners for selection buttons removed (handled by main.js)
    
    // Play again button event
    playAgainBtn.addEventListener('click', () => {
        showScreen(selectionScreen);
    });

    // Redundant selection state management functions removed (handled by main.js)

    // Game screens management
    function showScreen(screen) {
        // Hide all screens first
        [selectionScreen, gameScreen, resultScreen].forEach(s => s.classList.add('hidden'));
        
        // Show the requested screen
        screen.classList.remove('hidden');
        
        // Special handling for game screen
        if (screen === gameScreen && currentAgeGroup && currentDifficulty) {
            loadQuestions();
            loadQuestion();
        }
    }

    // Game initialization and logic
    function startGame() {
        if (!currentAgeGroup || !currentDifficulty) {
            console.error('Age group or difficulty not selected');
            return;
        }

        // Reset game state
        currentScore = 0;
        currentLevel = 1;
        timeLeft = 60;
        currentQuestionIndex = 0;
        
        // Load questions first
        loadQuestions();
        
        if (currentQuestions.length === 0) {
            console.error('No questions loaded');
            return;
        }

        // Update UI
        scoreDisplay.textContent = currentScore;
        levelDisplay.textContent = currentLevel;
        timeDisplay.textContent = timeLeft + 's';
        
        // Show game screen and load first question
        showScreen(gameScreen);
        loadQuestion();
        
        // Start the timer
        startTimer();
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

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Make toggleTheme available globally
window.toggleTheme = toggleTheme;