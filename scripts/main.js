import { Game } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    
    // DOM Elements
    const selectionScreen = document.getElementById('selection-screen');
    const gameScreen = document.getElementById('game-screen');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const scoreDisplay = document.querySelector('.score');
    const timerDisplay = document.querySelector('.timer');
    const themeToggle = document.querySelector('.theme-toggle');

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });

    // Selection buttons
    document.querySelectorAll('.age-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.age-btn').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            game.ageGroup = button.dataset.value;
        });
    });

    document.querySelectorAll('.diff-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            game.difficulty = button.dataset.value;
        });
    });

    async function startGame() {
        if (!game.ageGroup || !game.difficulty) {
            alert('Please select both age group and difficulty!');
            return;
        }

        selectionScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        game.initialize(game.ageGroup, game.difficulty);
        
        // Start the timer
        game.startTimer((timeLeft) => {
            timerDisplay.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                endGame();
            }
        });

        // Load first question
        await loadQuestion();
    }

    async function loadQuestion() {
        const question = await game.getQuestion();
        if (!question) return;

        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => handleAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    function handleAnswer(selectedIndex) {
        const isCorrect = game.checkAnswer(selectedIndex);
        scoreDisplay.textContent = `Score: ${game.score}`;
        loadQuestion();
    }

    function endGame() {
        gameScreen.classList.add('hidden');
        selectionScreen.classList.remove('hidden');
        alert(`Game Over! Final Score: ${game.score}`);
    }

    // Add event listener to start button
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Game';
    startButton.className = 'primary-btn';
    startButton.addEventListener('click', startGame);
    document.querySelector('.selection-container').appendChild(startButton);
});