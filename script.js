const pads = document.querySelectorAll('.pad');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let sequence = [];
let userSequence = [];
let level = 0;
let playing = false;

function flashPad(color) {
    const pad = document.getElementById(color);
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 300);
}

function nextLevel() {
    userSequence = [];
    level++;
    scoreDisplay.textContent = level < 10 ? "0" + level : level;
    
    const colors = ['green', 'red', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * 4)];
    sequence.push(randomColor);
    
    let i = 0;
    const interval = setInterval(() => {
        flashPad(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            playing = true;
        }
    }, 600);
}

pads.forEach(pad => {
    pad.addEventListener('click', (e) => {
        if (!playing) return;
        
        const color = e.target.id;
        flashPad(color);
        userSequence.push(color);
        
        const index = userSequence.length - 1;
        if (userSequence[index] !== sequence[index]) {
            alert('Game Over! Final Score: ' + level);
            resetGame();
            return;
        }
        
        if (userSequence.length === sequence.length) {
            playing = false;
            setTimeout(nextLevel, 1000);
        }
    });
});

function resetGame() {
    sequence = [];
    userSequence = [];
    level = 0;
    scoreDisplay.textContent = "00";
    playing = false;
}

startBtn.addEventListener('click', () => {
    resetGame();
    nextLevel();
});