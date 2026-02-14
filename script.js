const pngs = {
    rose: "png1.png", ring: "png2.png", choco: "png3.png", 
    teddy: "png4.png", promise: "png5.png", hug: "png6.png", kiss: "png7.png"
};

const stories = [
    { gif: "gif2.gif", p: "rose", title: "My Red Rose 🌹", text: "En chellaame, intha ulagathulaye romba azhagana rose nee thaan." },
    { gif: "gif3.gif", p: "ring", title: "My Forever 💍", text: "Thangame, I want you for 7 lifetimes. En koodave irupiya?" },
    { gif: "gif4.gif", p: "choco", title: "Sweetest Soul 🍫", text: "Vairame, candy and chocolate are nothing compared to your sweetness. Un udhadu thaan enaku sugar-eh!" },
    { gif: "gif5.gif", p: "teddy", title: "My Cuddle Partner 🧸", text: "Pondatiii, you are my world's cutest teddy." },
    { gif: "gif6.gif", p: "promise", title: "My Solemn Promise 🤝", text: "Azhagiye, I will never let go of your hand. That is my Sathiyam." },
    { gif: "gif7.gif", p: "hug", title: "Safe Heaven 🤗", text: "Un madiyil saayum pothu kedaikura nimmathi vera engayum kedaikaathu." },
    { gif: "gif8.gif", p: "kiss", title: "Pure Magic 💋", text: "Milkcake-ey, every time you kiss me, time stops." }
];

let currentStep = -1;
let fadeInterval;
const inkContent = document.getElementById("inkContent");
const fxLayer = document.getElementById("transition-layer");
const mainGif = document.getElementById("mainGif");

// PRELOADER: Forces the browser to download GIFs early
function preloadNext() {
    if (currentStep + 1 < stories.length) {
        const nextImg = new Image();
        nextImg.src = stories[currentStep + 1].gif;
    } else if (currentStep + 1 === stories.length) {
        const propImg = new Image();
        propImg.src = "gif9.gif";
    }
}

function startJourney() { nextStory(); }

function nextStory() {
    currentStep++;
    inkContent.classList.add("hidden");

    clearInterval(fadeInterval);
    fxLayer.innerHTML = "";

    setTimeout(() => {
        if (currentStep < stories.length) {
            const data = stories[currentStep];
            mainGif.src = data.gif;
            document.getElementById("titleText").innerText = data.title;
            document.getElementById("msgText").innerText = data.text;
            document.getElementById("actionArea").innerHTML = `<button class="next-btn" onclick="nextStory()">Next Page 📖</button>`;
            
            startFadingSequence(pngs[data.p]);
            preloadNext(); // Preload for the next click
        } else {
            loadProposal();
        }
        inkContent.classList.remove("hidden");
    }, 500); // Shorter delay for snappier feel
}

function startFadingSequence(imgUrl) {
    spawnOne(imgUrl);
    setTimeout(() => spawnOne(imgUrl), 1500);
    fadeInterval = setInterval(() => spawnOne(imgUrl), 2000);
}

function spawnOne(url) {
    let img = document.createElement("img");
    img.src = url;
    img.className = "fading-png";
    
    // FULL SCREEN RANDOMIZATION:
    // This allows them to appear anywhere from 5% to 85% of screen width/height
    img.style.left = (Math.random() * 80 + 5) + "vw";
    img.style.top = (Math.random() * 80 + 5) + "vh";
    
    let randomRot = (Math.random() * 60 - 30) + "deg";
    img.style.setProperty('--rotation', randomRot);
    img.style.width = (Math.random() * 40 + 80) + "px"; 
    
    fxLayer.appendChild(img);
    setTimeout(() => { img.remove(); }, 4000);
}

function loadProposal() {
    mainGif.src = "gif9.gif";
    document.getElementById("titleText").innerText = "En Uyir Pondati...";
    document.getElementById("msgText").innerText = "Will you be my Valentine forever and ever?";
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
    document.getElementById("actionArea").innerHTML = `
        <a href="tel:9353781514" class="call-btn">Call your purushan 📞</a>
    `;
    setTimeout(() => {
        mainGif.src = "gif10.gif";
        document.getElementById("titleText").innerText = "Yayyy! 🎉";
        document.getElementById("msgText").innerText = "Happy Valentine's Day! Love you 3000! ❤️";
    }, 400);
}

function dodge() {
    const btn = document.getElementById("btnNo");
    if (!btn) return;
    btn.style.position = "fixed";
    btn.style.left = Math.random() * (window.innerWidth - 120) + "px";
    btn.style.top = Math.random() * (window.innerHeight - 60) + "px";
}
