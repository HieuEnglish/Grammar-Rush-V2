let currentAgeGroup = '';
let currentDifficulty = '';
let currentScore = 0;
let currentLevel = 1;
let timeLeft = 60;
let timer;
let currentQuestions = [];
let currentQuestionIndex = 0;

// Game state management
// Update the selection functions
function selectAgeGroup(ageGroup) {
    // find the button by its data-value
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
        currentDifficulty = '';
        clickedButton.classList.remove('selected');
    } else {
        currentDifficulty = difficulty;
        document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('selected'));
        clickedButton.classList.add('selected');
    }
    checkStartConditions();
}

// Update window.onload
window.onload = () => {
    // Set initial theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);
    
    // Set initial button icon
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }
    
    // Reset game state
    currentAgeGroup = '';
    currentDifficulty = '';
    document.querySelectorAll('.age-btn, .diff-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    checkStartConditions();
}

function checkStartConditions() {
    const startBtn = document.getElementById('startBtn');
    const canStart = currentAgeGroup && currentDifficulty;
    
    // Update button state
    startBtn.disabled = !canStart;
    
    // Add/remove visual feedback class
    if (canStart) {
        startBtn.classList.add('ready');
    } else {
        startBtn.classList.remove('ready');
    }
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
    progressBar = document.querySelector('.progress-bar');
    updateProgress(timeLeft, totalTime);
    startTimer();
    displayQuestion();
}

// Timer management
function startTimer() {
    updateTimer();
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        updateProgress(timeLeft, totalTime);
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

// Add ripple effect function
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    ripple.className = 'ripple';
    ripple.style.left = `${event.clientX - rect.left - 50}px`;
    ripple.style.top = `${event.clientY - rect.top - 50}px`;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
}

// Add event listeners for buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.option-btn, .start-btn, .age-btn, .diff-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

// Update displayQuestion function
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
        button.className = 'option-btn fade-in';
        button.textContent = option;
        button.onclick = (e) => {
            createRipple(e);
            checkAnswer(index);
        };
        optionsContainer.appendChild(button);
    });

    addRippleEffect();
}

// Update updateLevel function
function updateLevel() {
    const levelElement = document.getElementById('levelValue');
    levelElement.textContent = currentLevel;
    levelElement.classList.add('level-up');
    setTimeout(() => levelElement.classList.remove('level-up'), 500);
    
    // Add trophy animation
    const trophy = document.querySelector('.level i');
    trophy.style.animation = 'none';
    setTimeout(() => trophy.style.animation = 'pulse 1.5s infinite', 10);
}

// Update checkAnswer function
function checkAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        buttons[selectedIndex].classList.add('correct');
        updateScore(true);
        
        // Animate score icon
        const scoreIcon = document.querySelector('.score i');
        scoreIcon.style.animation = 'none';
        setTimeout(() => scoreIcon.style.animation = 'pulse 1.5s infinite', 10);
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

// Utility: set up toggling for a group of buttons
// Remove the setupToggleButtons function since we won't need it anymore
function setupToggleButtons(selector, exclusive = false) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (exclusive) {
                // If already selected, de-select it; otherwise clear others & select this one
                if (btn.classList.contains('selected')) {
                    btn.classList.remove('selected');
                    return btn.dataset.value || '';
                } else {
                    buttons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    return btn.dataset.value;
                }
            } else {
                // non-exclusive: just toggle this button
                btn.classList.toggle('selected');
                return btn.classList.contains('selected') ? btn.dataset.value : '';
            }
        });
    });
}

// Add to window.onload
window.onload = () => {
    // Set initial theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);
    
    // Set initial button icon
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }
    
    // Reset game state
    currentAgeGroup = '';
    currentDifficulty = '';
    document.querySelectorAll('.age-btn, .diff-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    checkStartConditions();
}

function selectAgeGroup(ageGroup) {
    // find the button
    const btn = document.querySelector(`.age-btn[data-value="${ageGroup}"]`);
    if (!btn) return;

    // toggle state
    if (currentAgeGroup === ageGroup) {
        currentAgeGroup = '';
    } else {
        currentAgeGroup = ageGroup;
    }

    // sync UI
    document.querySelectorAll('.age-btn').forEach(b => {
        b.classList.toggle('selected', b.dataset.value === currentAgeGroup);
    });

    checkStartConditions();
}

function selectDifficulty(difficulty) {
    const btn = document.querySelector(`.diff-btn[data-value="${difficulty}"]`);
    if (!btn) return;

    if (currentDifficulty === difficulty) {
        currentDifficulty = '';
    } else {
        currentDifficulty = difficulty;
    }

    document.querySelectorAll('.diff-btn').forEach(b => {
        b.classList.toggle('selected', b.dataset.value === currentDifficulty);
    });

    checkStartConditions();
}

// Modify the endGame function to show medal
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

    // Show medal based on score percentage
    const scorePercentage = (currentScore / (currentQuestions.length * 10 * currentLevel)) * 100;
    const modal = document.getElementById("medalModal");
    const icon = document.getElementById("medalIcon");
    const message = document.getElementById("medalMessage");

    if (scorePercentage >= 90) {
        icon.textContent = "🥇";
        message.textContent = "Perfect! You're a grammar master!";
    } else if (scorePercentage >= 70) {
        icon.textContent = "🥈";
        message.textContent = "Great job! Almost perfect!";
    } else if (scorePercentage >= 50) {
        icon.textContent = "🥉";
        message.textContent = "Good effort! Keep practicing!";
    } else {
        icon.textContent = "⭐";
        message.textContent = "Keep learning! You'll improve!";
    }

    modal.style.display = "flex";
}

// Modify displayQuestion to update progress
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
        button.className = 'option-btn fade-in';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    addRippleEffect();
}

function playAgain() {
    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById('welcomeScreen').classList.remove('hidden');
    currentAgeGroup = '';
    currentDifficulty = '';
    document.querySelectorAll('.age-btn, .diff-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    checkStartConditions();
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