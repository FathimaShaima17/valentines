const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const cursor = document.getElementById('cursor-heart');
const kirby = document.getElementById('kirby-gif');
const card = document.getElementById('main-card');

let clickCount = 0;
let yesScale = 1;     // Control scaling size of the "Yes" button

const sadGifs = [
    "assets/images/kirby-sad.gif",
    "assets/images/kirby-crying.gif"
];

const victoryGifs = [
    "assets/images/dance.gif",
    "assets/images/them.gif"
];
//phrases that replace the "No" button text by one ny one
const phrases = [
   "No", 
    "Are you sure? 🥺", 
    "Pookie please", 
    "Pookie PLEASE", 
    "You can't do this to me!",
    "Don't do this! 😭", 
    "Stop it! 🛑", 
    "MY HEART CAN'T TAKE IT! 💔"
];

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

noBtn.addEventListener('mouseover', () => {     //phrases are used, the "No" button jumps randomly 
    if (clickCount >= phrases.length) {

        //generate random position within screen 
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        
        // move button to random location
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }
});

noBtn.addEventListener('click', () => {
    if (clickCount < phrases.length) {
        noBtn.textContent = phrases[clickCount];
    }

    kirby.src = sadGifs[clickCount % sadGifs.length];

    clickCount++;

    // add shake animation to main card
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 400);

    yesScale += 0.4; 
    yesBtn.style.transform = `scale(${yesScale})`;
    document.querySelector('.btn-group').style.gap = (15 * yesScale) + "px";
});

yesBtn.addEventListener('click', () => {
    document.querySelector('.wrapper').style.display = 'none';
    document.title = "Thanks for being my Valentine!";
    
    const victoryScreen = document.getElementById('victory-screen');
    const victoryImg = document.getElementById('victory-kirby');
    
    victoryImg.src = victoryGifs[0];
    victoryScreen.classList.remove('hidden');

    setTimeout(() => {
        victoryImg.src = victoryGifs[1];
    }, 3000);

    startRain();
});

// function to create falling heart/flower emojis
function startRain() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-fall';
        
        const symbols = ["💖", "💗", "💝", "🌸", "🌹", "🌷", "✨"];
        heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 20 + "px";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s";
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }, 150);
}