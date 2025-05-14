// Import game initialization functions
import { initializeGame } from './game.js';

// Global state
let currentAgeGroup = '';
let currentDifficulty = '';

function selectAgeGroup(age) {
    const clickedButton = document.querySelector(`.age-btn[data-value="${age}"]`);
    if (!clickedButton) return;

    // Always remove previous selection first
    document.querySelectorAll('.age-btn').forEach(btn => btn.classList.remove('selected'));

    // Select new option if it's different from current
    if (currentAgeGroup !== age) {
        currentAgeGroup = age;
        clickedButton.classList.add('selected');
    } else {
        currentAgeGroup = '';
    }
    
    checkStartConditions();
}

function selectDifficulty(difficulty) {
    const clickedButton = document.querySelector(`.diff-btn[data-value="${difficulty}"]`);
    if (!clickedButton) return;

    // Always remove previous selection first
    document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('selected'));

    // Select new option if it's different from current
    if (currentDifficulty !== difficulty) {
        currentDifficulty = difficulty;
        clickedButton.classList.add('selected');
    } else {
        currentDifficulty = '';
    }
    
    checkStartConditions();
}

function checkStartConditions() {
    const startButton = document.querySelector('#startGameBtn');
    if (startButton) {
        const canStart = currentAgeGroup && currentDifficulty;
        startButton.disabled = !canStart;
        
        // Add/remove visual feedback class
        if (canStart) {
            startButton.classList.add('ready');
        } else {
            startButton.classList.remove('ready');
        }
    }
}

function startGame() {
    if (!currentAgeGroup || !currentDifficulty) {
        return;
    }
    
    // Hide selection screen and show game screen
    document.querySelector('#selection-screen').classList.add('hidden');
    document.querySelector('#game-screen').classList.remove('hidden');
    
    // Initialize game with selected options
    initializeGame(currentAgeGroup, currentDifficulty);
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    body.classList.toggle('light-theme');
    themeToggle.textContent = body.classList.contains('light-theme') ? '🌙' : '☀️';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize event listeners for age buttons
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.addEventListener('click', () => selectAgeGroup(btn.dataset.value));
    });

    // Initialize event listeners for difficulty buttons
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.addEventListener('click', () => selectDifficulty(btn.dataset.value));
    });

    // Initialize start game button
    document.querySelector('#startGameBtn').addEventListener('click', startGame);

    // Initialize theme toggle
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

    // Initial check for start conditions
    checkStartConditions();
});