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

export function initTheme() {
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
    currentScore = 0;
    currentLevel = 1;
    timeLeft = 60;
    currentQuestionIndex = 0;
    loadQuestions();
}

export function startGame() {
    if (!currentAgeGroup || !currentDifficulty) {
        console.error('Age group or difficulty not selected');
        return false;
    }
    currentScore = 0;
    currentLevel = 1;
    timeLeft = 60;
    currentQuestionIndex = 0;
    loadQuestions();
    return currentQuestions.length > 0;
}

function loadQuestions() {
    if (questionBank[currentAgeGroup] && questionBank[currentAgeGroup][currentDifficulty]) {
        currentQuestions = [...questionBank[currentAgeGroup][currentDifficulty]];
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

export function getCurrentQuestion() {
    if (currentQuestions.length === 0) return null;
    return currentQuestions[currentQuestionIndex];
}

export function answerQuestion(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctIndex;
    updateScore(isCorrect ? 10 * currentLevel : 0);
    currentQuestionIndex++;
    // Provide feedback for correct/incorrect answers
    if (typeof window !== 'undefined') {
        const feedbackElem = document.getElementById('feedback');
        if (feedbackElem) {
            feedbackElem.textContent = isCorrect ? 'Correct!' : `Incorrect! Correct answer: ${question.options[question.correctIndex]}`;
            feedbackElem.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
            setTimeout(() => {
                feedbackElem.textContent = '';
                feedbackElem.className = 'feedback';
            }, 1200);
        }
    }
    return isCorrect;
}

function updateScore(points) {
    currentScore += points;
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('grammarRushHighScore', highScore);
    }
}

export function getScore() {
    return currentScore;
}

export function getLevel() {
    return currentLevel;
}

export function getTimeLeft() {
    return timeLeft;
}

export function getHighScore() {
    return highScore;
}

export function nextLevel() {
    currentLevel++;
    timeLeft += 30;
    loadQuestions();
    currentQuestionIndex = 0;
}

export function startTimer(onTick, onEnd) {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        if (onTick) onTick(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (onEnd) onEnd();
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
// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}
