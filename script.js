const pngs = { rose: "png1.png", ring: "png2.png", choco: "png3.png", teddy: "png4.png", promise: "png5.png", hug: "png6.png", kiss: "png7.png" };
const stories = [
    { gif: "gif2.gif", p: "rose", title: "Happy Rose Day 🌹", text: "En chellaame, intha ulagathulaye romba azhagana rose nee thaan. You make my life bloom every single day. You are my forever flower." },
    { gif: "gif3.gif", p: "ring", title: "Happy Propose Day 💍", text: "Thangame, I want you for 7 lifetimes. En koodave irupiya? You are my best decision and my greatest dream." },
    { gif: "gif4.gif", p: "choco", title: "Happy Chocolate Day 🍫", text: "Vairame, candy and chocolate are nothing compared to your sweetness. Un udhadu thaan enaku sugar-eh!" },
    { gif: "gif5.gif", p: "teddy", title: "Happy Teddy Day 🧸", text: "Pondatiii, you are my world's cutest teddy. You are my comfort zone and the only cuddle I ever need." },
    { gif: "gif6.gif", p: "promise", title: "Happy Promise Day 🤝", text: "Azhagiye, I will never let go of your hand. That is my Sathiyam. I promise to be your biggest supporter." },
    { gif: "gif7.gif", p: "hug", title: "Happy Hug Day 🤗", text: "Un madiyil saayum pothu kedaikura nimmathi vera engayum kedaikaathu. You are my home, baby girl." },
    { gif: "gif8.gif", p: "kiss", title: "Happy Kiss Day 💋", text: "Milkcake-ey, every time you kiss me, time stops. That touch makes me feel like I can conquer the world." }
];

let currentStep = -1;
let lastTap = 0;
let fadeInterval, bubbleInterval;
const paperCard = document.getElementById("paperCard");
const fxLayer = document.getElementById("transition-layer");
const bubbleContainer = document.getElementById("bubble-container");
const mainGif = document.getElementById("mainGif");

// DOUBLE TAP LOGIC
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('bubble')) {
        popBubble(e.target);
        return;
    }
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;

    const now = Date.now();
    if (now - lastTap < 300) { // Double tap detected
        if (e.clientX > window.innerWidth / 2) navigate(1); // Right side
        else navigate(-1); // Left side
    }
    lastTap = now;
});

function navigate(dir) {
    if (dir === 1 && currentStep >= stories.length) return;
    if (dir === -1 && currentStep <= 0) return;

    const outClass = (dir === 1) ? "story-out-next" : "story-out-prev";
    paperCard.classList.add(outClass);
    
    setTimeout(() => {
        currentStep += dir;
        paperCard.classList.remove(outClass);
        updatePage();
        paperCard.classList.add("story-in");
        setTimeout(() => paperCard.classList.remove("story-in"), 600);
    }, 400);
}

function updatePage() {
    clearInterval(fadeInterval);
    clearInterval(bubbleInterval);
    fxLayer.innerHTML = "";
    bubbleContainer.innerHTML = "";

    if (currentStep < stories.length) {
        const data = stories[currentStep];
        mainGif.src = data.gif;
        document.getElementById("titleText").innerText = data.title;
        document.getElementById("msgText").innerText = data.text;
        document.getElementById("actionArea").innerHTML = "";
        startFadingSequence(pngs[data.p]);
        startBubbles();
    } else {
        loadProposal();
    }
}

function startBubbles() { bubbleInterval = setInterval(createBubble, 1200); }
function createBubble() {
    const b = document.createElement("div"); b.className = "bubble";
    const s = Math.random() * 30 + 30 + "px";
    b.style.width = s; b.style.height = s;
    b.style.left = Math.random() * 85 + "vw";
    b.style.animationDuration = Math.random() * 2 + 3 + "s";
    bubbleContainer.appendChild(b);
    setTimeout(() => b.remove(), 5000);
}
function popBubble(el) { el.classList.add("popping"); setTimeout(() => el.remove(), 200); }

function startFadingSequence(img) { 
    const spawn = () => {
        let i = document.createElement("img"); i.src = img; i.className = "fading-png";
        i.style.left = Math.random() * 80 + "vw"; i.style.top = Math.random() * 80 + "vh";
        i.style.width = "80px"; fxLayer.appendChild(i);
        setTimeout(() => i.remove(), 4000);
    };
    for(let j=0; j<5; j++) setTimeout(spawn, j*500);
    fadeInterval = setInterval(spawn, 1000);
}

function loadProposal() {
    mainGif.src = "gif9.gif";
    document.getElementById("titleText").innerText = "En Uyir Pondati...";
    document.getElementById("msgText").innerText = "Will you be my Valentine forever and ever?";
    document.getElementById("actionArea").innerHTML = `<div class="btn-group"><button id="btnYes" onclick="showFinal()">Yes! ❤️</button><button id="btnNo" onmouseover="dodge()">No</button></div>`;
}

function showFinal() {
    paperCard.classList.add("story-out-next");
    setTimeout(() => {
        paperCard.classList.remove("story-out-next");
        mainGif.src = "gif10.gif";
        document.getElementById("titleText").innerText = "My Forever Love! 🎉";
        document.getElementById("msgText").innerHTML = "Our journey is just beginning. I love you more than all the stars in the sky. Thank you for being the most amazing <strong>pondati</strong>.";
        document.getElementById("actionArea").innerHTML = `<a href="tel:9353781514" class="call-btn">Call your purushan 📞</a>`;
        paperCard.classList.add("story-in");
    }, 400);
}

function dodge() {
    const b = document.getElementById("btnNo");
    b.style.position = "fixed";
    b.style.left = Math.random() * (window.innerWidth - 100) + "px";
    b.style.top = Math.random() * (window.innerHeight - 50) + "px";
}
