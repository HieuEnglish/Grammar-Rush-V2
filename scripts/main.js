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
            button.setAttribute('tabindex', '0');
            button.setAttribute('aria-label', option);
            button.addEventListener('click', () => handleAnswer(index, button));
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleAnswer(index, button);
                }
            });
            optionsContainer.appendChild(button);
        });
        updateProgressBar();
    }

    function handleAnswer(selectedIndex, button) {
        const isCorrect = game.checkAnswer(selectedIndex);
        scoreDisplay.textContent = `Score: ${game.score}`;
        // Visual feedback
        if (isCorrect) {
            button.classList.add('correct');
            button.innerHTML += ' <span class="feedback" aria-label="Correct">✔️</span>';
        } else {
            button.classList.add('incorrect');
            button.innerHTML += ' <span class="feedback" aria-label="Incorrect">❌</span>';
        }
        // Disable all buttons after answer
        Array.from(optionsContainer.children).forEach(btn => {
            btn.disabled = true;
        });
        setTimeout(() => {
            loadQuestion();
        }, 900);
    }

    // Progress Bar
    function updateProgressBar() {
        let progressBar = document.getElementById('progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'progress-bar';
            progressBar.setAttribute('role', 'progressbar');
            progressBar.setAttribute('aria-valuemin', '0');
            progressBar.setAttribute('aria-valuemax', game.totalQuestions);
            progressBar.setAttribute('aria-valuenow', game.currentQuestionIndex + 1);
            progressBar.style.height = '16px';
            progressBar.style.background = '#eee';
            progressBar.style.borderRadius = '8px';
            progressBar.style.margin = '1rem 0';
            const fill = document.createElement('div');
            fill.id = 'progress-fill';
            fill.style.height = '100%';
            fill.style.background = '#4caf50';
            fill.style.borderRadius = '8px';
            fill.style.width = '0%';
            progressBar.appendChild(fill);
            gameScreen.insertBefore(progressBar, questionText);
        }
        const fill = document.getElementById('progress-fill');
        const percent = ((game.currentQuestionIndex + 1) / game.totalQuestions) * 100;
        fill.style.width = percent + '%';
        progressBar.setAttribute('aria-valuenow', game.currentQuestionIndex + 1);
    }
    function endGame() {
        gameScreen.classList.add('hidden');
        selectionScreen.classList.remove('hidden');
        alert(`Game Over! Final Score: ${game.score}`);
    }

    // Connect to existing start button
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    
    // Enable start button when selections are made
    document.querySelectorAll('.age-btn, .diff-btn').forEach(button => {
        button.addEventListener('click', () => {
            const ageSelected = document.querySelector('.age-btn.selected');
            const diffSelected = document.querySelector('.diff-btn.selected');
            document.getElementById('startGameBtn').disabled = !(ageSelected && diffSelected);
        });
    });
});