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
const inkContent = document.getElementById("inkContent");
const fxLayer = document.getElementById("transition-layer");
const mainGif = document.getElementById("mainGif");

function startJourney() { nextStory(); }

function nextStory() {
    // 1. Instantly clear old PNGs so they don't overlap
    fxLayer.innerHTML = "";
    currentStep++;
    
    // 2. Fade out current content
    inkContent.classList.add("hidden");

    setTimeout(() => {
        let currentPNG = "kiss";
        if (currentStep < stories.length) currentPNG = stories[currentStep].p;

        // 3. Pop new noticeable PNGs
        for(let i = 0; i < 20; i++) {
            setTimeout(() => spawnNoticeablePNG(pngs[currentPNG]), i * 60);
        }

        // 4. Update text and GIF
        if (currentStep < stories.length) {
            mainGif.src = stories[currentStep].gif;
            document.getElementById("titleText").innerText = stories[currentStep].title;
            document.getElementById("msgText").innerText = stories[currentStep].text;
            document.getElementById("actionArea").innerHTML = `<button class="next-btn" onclick="nextStory()">Next Page 📖</button>`;
        } else {
            loadProposal();
        }
        
        // 5. Fade content back in
        inkContent.classList.remove("hidden");
    }, 600);
}

function spawnNoticeablePNG(url) {
    let img = document.createElement("img");
    img.src = url;
    img.className = "popping-png";
    
    // Random positions (mostly center-focused to be noticeable)
    img.style.left = (Math.random() * 70 + 15) + "vw";
    img.style.top = (Math.random() * 70 + 15) + "vh";
    
    let randomRot = (Math.random() * 40 - 20) + "deg";
    img.style.setProperty('--rotation', randomRot);
    img.style.width = (Math.random() * 50 + 80) + "px"; // Larger and more noticeable
    
    fxLayer.appendChild(img);
    
    // Auto-remove from DOM after animation finishes
    setTimeout(() => { img.remove(); }, 2000);
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
    dodge();
}

function showFinal() {
    document.getElementById("actionArea").innerHTML = `
        <a href="tel:9353781514" class="call-btn">Call your purushan 📞</a>
    `;
    for(let i = 0; i < 30; i++) setTimeout(() => spawnNoticeablePNG(pngs.kiss), i * 50);
    
    setTimeout(() => {
        mainGif.src = "gif10.gif";
        document.getElementById("titleText").innerText = "Yayyy! 🎉";
        document.getElementById("msgText").innerText = "Happy Valentine's Day! Love you 3000! ❤️";
    }, 500);
}

function dodge() {
    const btn = document.getElementById("btnNo");
    if (!btn) return;
    btn.style.position = "fixed";
    btn.style.left = Math.random() * (window.innerWidth - 100) + "px";
    btn.style.top = Math.random() * (window.innerHeight - 50) + "px";
}
