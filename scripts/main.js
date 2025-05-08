let selectedAge = null;
let selectedDifficulty = null;

function selectAgeGroup(age) {
    // Remove selected class from all age buttons
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    const selectedBtn = document.querySelector(`.age-btn[data-value="${age}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
        selectedAge = age;
    }
    
    checkStartButtonState();
}

function selectDifficulty(difficulty) {
    // Remove selected class from all difficulty buttons
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    const selectedBtn = document.querySelector(`.diff-btn[data-value="${difficulty}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
        selectedDifficulty = difficulty;
    }
    
    checkStartButtonState();
}

function checkStartButtonState() {
    const startButton = document.querySelector('#startGameBtn');
    if (startButton) {
        startButton.disabled = !(selectedAge && selectedDifficulty);
    }
}

function startGame() {
    if (!selectedAge || !selectedDifficulty) {
        return;
    }
    
    // Hide welcome screen and show game screen
    document.querySelector('#welcomeScreen').classList.remove('active');
    document.querySelector('#gameScreen').classList.add('active');
    
    // Initialize game with selected options
    initializeGame(selectedAge, selectedDifficulty);
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    body.classList.toggle('light-theme');
    themeToggle.textContent = body.classList.contains('light-theme') ? '🌙' : '☀️';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    checkStartButtonState();
});