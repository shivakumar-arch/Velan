const pngs = {
    rose: "png1.png",
    ring: "png2.png",
    choco: "png3.png",
    teddy: "png4.png",
    promise: "png5.png",
    hug: "png6.png",
    kiss: "png7.png"
};

const stories = [
    { gif: "gif2.gif", p: "rose", title: "My Red Rose 🌹", text: "En chellaame, intha ulagathulaye romba azhagana rose nee thaan. You make my life bloom every single day." },
    { gif: "gif3.gif", p: "ring", title: "My Forever 💍", text: "Thangame, I don't just want a Valentine. I want you for 7 lifetimes. En koodave irupiya?" },
    { gif: "gif4.gif", p: "choco", title: "Sweetest Soul 🍫", text: "Vairame, candy and chocolate are nothing compared to your sweetness. Un udhadu thaan enaku sugar-eh!" },
    { gif: "gif5.gif", p: "teddy", title: "My Cuddle Partner 🧸", text: "Pondatiii, whenever I feel tired, thinking of your hug is my only medicine. You are my world's cutest teddy." },
    { gif: "gif6.gif", p: "promise", title: "My Solemn Promise 🤝", text: "Azhagiye, no matter how hard life gets, I will never let go of your hand. That is my Sathiyam to you." },
    { gif: "gif7.gif", p: "hug", title: "Safe Heaven 🤗", text: "Un madiyil saayum pothu kedaikura nimmathi vera engayum kedaikaathu. You are my home, baby girl." },
    { gif: "gif8.gif", p: "kiss", title: "Pure Magic 💋", text: "Milkcake-ey, every time you kiss me, time stops. I'm so lucky to be your man." }
];

let currentStep = -1;
const inkContent = document.getElementById("inkContent");
const fxLayer = document.getElementById("transition-layer");
const mainGif = document.getElementById("mainGif");

function startJourney() { nextStory(); }

function nextStory() {
    currentStep++;
    
    let currentPNG = "kiss";
    if (currentStep < stories.length) currentPNG = stories[currentStep].p;

    // Pop stickers (They don't vanish anymore)
    for(let i = 0; i < 35; i++) {
        setTimeout(() => spawnSticker(pngs[currentPNG]), i * 40);
    }

    setTimeout(() => {
        inkContent.classList.add("hidden");
    }, 800);

    setTimeout(() => {
        if (currentStep < stories.length) {
            mainGif.src = stories[currentStep].gif;
            document.getElementById("titleText").innerText = stories[currentStep].title;
            document.getElementById("msgText").innerText = stories[currentStep].text;
            document.getElementById("actionArea").innerHTML = `<button class="next-btn" onclick="nextStory()">Next Page 📖</button>`;
        } else {
            loadProposal();
        }
        inkContent.classList.remove("hidden");
    }, 1800);
}

function spawnSticker(url) {
    let img = document.createElement("img");
    img.src = url;
    img.className = "stuck-png";
    img.style.left = (Math.random() * 85 + 2) + "vw";
    img.style.top = (Math.random() * 85 + 2) + "vh";
    let randomRot = (Math.random() * 60 - 30) + "deg";
    img.style.setProperty('--rotation', randomRot);
    img.style.width = (Math.random() * 40 + 60) + "px";
    fxLayer.appendChild(img);
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
    // Start the dodging behavior immediately for fun
    dodge();
}

function showFinal() {
    inkContent.classList.add("hidden");
    // Final burst of kisses
    for(let i = 0; i < 60; i++) setTimeout(() => spawnSticker(pngs.kiss), i * 30);
    
    setTimeout(() => {
        mainGif.src = "gif10.gif";
        document.getElementById("titleText").innerText = "Yayyy! 🎉";
        document.getElementById("msgText").innerText = "Happy Valentine's Day! Love you more than anything! ❤️";
        
        // ADD CALL BUTTON
        document.getElementById("actionArea").innerHTML = `
            <a href="tel:9353781514" class="call-btn">Call your purushan 📞</a>
        `;
        inkContent.classList.remove("hidden");
    }, 1500);
}

function dodge() {
    const btn = document.getElementById("btnNo");
    if (!btn) return;
    btn.style.position = "fixed";
    btn.style.left = Math.random() * (window.innerWidth - 120) + "px";
    btn.style.top = Math.random() * (window.innerHeight - 60) + "px";
}

