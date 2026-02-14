const pngs = {
    rose: "png1.png", ring: "png2.png", choco: "png3.png", 
    teddy: "png4.png", promise: "png5.png", hug: "png6.png", kiss: "png7.png"
};

const stories = [
    { 
        gif: "gif2.gif", p: "rose", title: "Happy Rose Day 🌹", 
        text: "En chellaame, intha ulagathulaye romba azhagana rose nee thaan. You make my life bloom every single day. I want to spend every season of my life watching you grow and bloom. You are my forever flower." 
    },
    { 
        gif: "gif3.gif", p: "ring", title: "Happy Propose Day 💍", 
        text: "Thangame, I want you for 7 lifetimes. En koodave irupiya? I want a partner for every adventure and a soul to share my silences with. You are my best decision and my greatest dream." 
    },
    { 
        gif: "gif4.gif", p: "choco", title: "Happy Chocolate Day 🍫", 
        text: "Vairame, candy and chocolate are nothing compared to your sweetness. Un udhadu thaan enaku sugar-eh! Life with you is like a box of the finest chocolates. Every moment is a different flavor of happiness." 
    },
    { 
        gif: "gif5.gif", p: "teddy", title: "Happy Teddy Day 🧸", 
        text: "Pondatiii, you are my world's cutest teddy. You are my comfort zone and my safe space. No matter how much I grow up, I will always need my favorite teddy bear to make me feel at home." 
    },
    { 
        gif: "gif6.gif", p: "promise", title: "Happy Promise Day 🤝", 
        text: "Azhagiye, I will never let go of your hand. That is my Sathiyam. I promise to be your biggest supporter and your softest place to land. I promise to choose you every single day, without doubt." 
    },
    { 
        gif: "gif7.gif", p: "hug", title: "Happy Hug Day 🤗", 
        text: "Un madiyil saayum pothu kedaikura nimmathi vera engayum kedaikaathu. You are my home, baby girl. A hug from you feels like the universe is finally in alignment. It is where all my fears disappear." 
    },
    { 
        gif: "gif8.gif", p: "kiss", title: "Happy Kiss Day 💋", 
        text: "Milkcake-ey, every time you kiss me, time stops. I'm so lucky to be your man. That touch makes me feel like I can conquer the world. It is the silent way our souls communicate." 
    }
];

let currentStep = -1;
let fadeInterval, bubbleInterval;
const paperCard = document.getElementById("paperCard");
const fxLayer = document.getElementById("transition-layer");
const bubbleContainer = document.getElementById("bubble-container");
const mainGif = document.getElementById("mainGif");

function handleTap(e) {
    if (e.target.classList.contains('bubble')) {
        popBubble(e.target);
        return;
    }
    if (currentStep >= stories.length) return;
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
    nextStory();
}

function nextStory() {
    currentStep++;
    paperCard.classList.add("story-out");
    clearInterval(fadeInterval);
    clearInterval(bubbleInterval);
    fxLayer.innerHTML = "";
    bubbleContainer.innerHTML = "";

    setTimeout(() => {
        paperCard.classList.remove("story-out");
        if (currentStep < stories.length) {
            const data = stories[currentStep];
            mainGif.src = data.gif;
            document.getElementById("titleText").innerText = data.title;
            document.getElementById("msgText").innerText = data.text;
            startFadingSequence(pngs[data.p]);
            // User requested bubbles except 1st and last 2 pages
            if (currentStep >= 0 && currentStep < stories.length) startBubbles();
            preloadNext();
        } else {
            loadProposal();
        }
        paperCard.classList.add("story-in");
        setTimeout(() => paperCard.classList.remove("story-in"), 600);
    }, 600);
}

function startBubbles() {
    bubbleInterval = setInterval(createBubble, 1000);
}

function createBubble() {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    const size = Math.random() * 40 + 40 + "px";
    bubble.style.width = size; bubble.style.height = size;
    bubble.style.left = Math.random() * 90 + "vw";
    bubble.style.animationDuration = Math.random() * 3 + 4 + "s";
    bubbleContainer.appendChild(bubble);
    setTimeout(() => { if (bubble.parentElement) bubble.remove(); }, 7000);
}

function popBubble(el) {
    el.classList.add("popping");
    setTimeout(() => { if (el.parentElement) el.remove(); }, 200);
}

function startFadingSequence(imgUrl) {
    for(let i=0; i<4; i++) setTimeout(() => spawnOne(imgUrl), i*400);
    fadeInterval = setInterval(() => spawnOne(imgUrl), 800); 
}

function spawnOne(url) {
    let img = document.createElement("img");
    img.src = url;
    img.className = "fading-png";
    img.style.left = (Math.random() * 80 + 5) + "vw";
    img.style.top = (Math.random() * 80 + 5) + "vh";
    let rot = (Math.random() * 60 - 30) + "deg";
    img.style.setProperty('--rotation', rot);
    img.style.width = (Math.random() * 30 + 80) + "px"; 
    fxLayer.appendChild(img);
    setTimeout(() => img.remove(), 4000);
}

function loadProposal() {
    mainGif.src = "gif9.gif";
    document.getElementById("titleText").innerText = "En Uyir Pondati...";
    document.getElementById("msgText").innerText = "You have walked through these days with me, but I want you for every day of my life. Will you be my Valentine forever? I promise to love you more than words can describe.";
    document.getElementById("actionArea").innerHTML = `
        <div class="btn-group">
            <button id="btnYes" onclick="showFinal()">Yes! ❤️</button>
            <button id="btnNo" onmouseover="dodge()" ontouchstart="dodge()">No</button>
        </div>
    `;
    startFadingSequence(pngs.kiss);
    dodge();
}

function showFinal() {
    paperCard.classList.add("story-out");
    setTimeout(() => {
        paperCard.classList.remove("story-out");
        mainGif.src = "gif10.gif";
        document.getElementById("titleText").innerText = "My Forever Love! 🎉";
        document.getElementById("msgText").innerHTML = `
            Every day with you is a beautiful dream. You are my soulmate, my best friend, and my life. Our journey is just beginning. <br><br>
            I promise to cherish you unconditionally for the rest of our days. You are my everything, <strong>en chellam</strong>. My heart belongs to you now and forever. Thank you for being the most amazing <strong>pondati</strong>. I love you more than anything in this world.
        `;
        document.getElementById("actionArea").innerHTML = `<a href="tel:9353781514" class="call-btn">Call your purushan 📞</a>`;
        paperCard.classList.add("story-in");
    }, 600);
}

function dodge() {
    const btn = document.getElementById("btnNo");
    if (!btn) return;
    btn.style.position = "fixed";
    btn.style.left = Math.random() * (window.innerWidth - 120) + "px";
    btn.style.top = Math.random() * (window.innerHeight - 60) + "px";
}

function preloadNext() {
    let n = currentStep + 1;
    if (n < stories.length) new Image().src = stories[n].gif;
}
