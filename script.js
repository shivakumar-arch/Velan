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
    { gif: "gif2.gif", p: "rose", title: "Rose Day", text: "chellaameee, you are the most beautiful flower in my universe." },
    { gif: "gif3.gif", p: "ring", title: "Propose Day", text: "thangameee, I want to spend forever with you." },
    { gif: "gif4.gif", p: "choco", title: "Chocolate Day", text: "vairameeeeeee, you are sweeter than any chocolate." },
    { gif: "gif5.gif", p: "teddy", title: "Teddy Day", text: "pondatiiiiiiiiiiii, you are my ultimate comfort." },
    { gif: "gif6.gif", p: "promise", title: "Promise Day", text: "azhagiiiiiiiiiiiiiii, I promise to hold your hand forever." },
    { gif: "gif7.gif", p: "hug", title: "Hug Day", text: "baby gurllllllllll, un kooda irukardhu thaan enaku happiness." },
    { gif: "gif8.gif", p: "kiss", title: "Kiss Day", text: "milkcake ehhhhh, one kiss from you makes everything better." }
];

let currentStep = -1;
const inkContent = document.getElementById("inkContent");
const fxLayer = document.getElementById("transition-layer");
const mainGif = document.getElementById("mainGif");

function startJourney() { nextStory(); }

function nextStory() {
    currentStep++;
    inkContent.classList.add("hidden");

    let currentPNG = "kiss";
    if (currentStep < stories.length) currentPNG = stories[currentStep].p;

    for(let i = 0; i < 45; i++) {
        setTimeout(() => spawnPNG(pngs[currentPNG]), i * 45);
    }

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
    }, 1500);
}

function spawnPNG(url) {
    let img = document.createElement("img");
    img.src = url;
    img.className = "falling-png";
    let startX = (Math.random() * 100) + "vw";
    img.style.setProperty('--startX', startX);
    img.style.left = startX;
    img.style.width = (Math.random() * 40 + 70) + "px";
    img.style.animationDuration = (Math.random() * 2 + 2) + "s";
    fxLayer.appendChild(img);
    setTimeout(() => img.remove(), 4000);
}

function loadProposal() {
    mainGif.src = "gif9.gif";
    document.getElementById("titleText").innerText = "My Pondati...";
    document.getElementById("msgText").innerText = "Will you be my Valentine forever?";
    document.getElementById("actionArea").innerHTML = `
        <div class="btn-group">
            <button id="btnYes" onclick="showFinal()">Yes! ❤️</button>
            <button id="btnNo" onmouseover="dodge()" ontouchstart="dodge()">No</button>
        </div>
    `;
}

function showFinal() {
    inkContent.classList.add("hidden");
    for(let i = 0; i < 65; i++) setTimeout(() => spawnPNG(pngs.kiss), i * 35);
    setTimeout(() => {
        mainGif.src = "gif10.gif";
        document.getElementById("titleText").innerText = "Yayyy! 🎉";
        document.getElementById("msgText").innerText = "Happy Valentine's Day! Love you 3000! ❤️";
        document.getElementById("actionArea").innerHTML = "";
        inkContent.classList.remove("hidden");
    }, 1500);
}

function dodge() {
    const btn = document.getElementById("btnNo");
    btn.style.position = "absolute";
    btn.style.left = Math.random() * (window.innerWidth - 100) + "px";
    btn.style.top = Math.random() * (window.innerHeight - 50) + "px";
}
