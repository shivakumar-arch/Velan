const pngs = {
    rose: "png1.png", ring: "png2.png", choco: "png3.png", 
    teddy: "png4.png", promise: "png5.png", hug: "png6.png", kiss: "png7.png"
};

const stories = [
    { 
        gif: "gif2.gif", p: "rose", title: "Happy Rose Day 🌹", 
        text: "En chellaame, intha ulagathulaye romba azhagana rose nee thaan. You make my life bloom every single day with your presence. Just like a rose, you are delicate and beautiful, but you have the strength to stand tall. I want to spend every season of my life watching you grow and bloom. You are my forever flower." 
    },
    { 
        gif: "gif3.gif", p: "ring", title: "Happy Propose Day 💍", 
        text: "Thangame, I want you for 7 lifetimes. En koodave irupiya? I don't just want a girl for a day; I want a partner for every adventure, a soul to share my silences with, and a hand to hold when the world gets loud. You are my best decision, my greatest dream, and the only 'Yes' I ever want to hear. Will you be mine forever?" 
    },
    { 
        gif: "gif4.gif", p: "choco", title: "Happy Chocolate Day 🍫", 
        text: "Vairame, candy and chocolate are nothing compared to your sweetness. Un udhadu thaan enaku sugar-eh! You have this incredible way of melting away all my stress and worries just by being near me. Life with you is like a box of the finest chocolates—every moment is a different flavor of happiness. Stay sweet, stay mine." 
    },
    { 
        gif: "gif5.gif", p: "teddy", title: "Happy Teddy Day 🧸", 
        text: "Pondatiii, you are my world's cutest teddy. You are my comfort zone, my safe space, and the person I want to hug tight at the end of every long day. No matter how much I grow up, I will always need my favorite teddy bear to make me feel at home. You are soft, warm, and the only cuddle I ever need." 
    },
    { 
        gif: "gif6.gif", p: "promise", title: "Happy Promise Day 🤝", 
        text: "Azhagiye, I will never let go of your hand. That is my Sathiyam. I promise to be your biggest supporter, your loudest cheerleader, and your softest place to land. I promise to choose you every single day, over and over, without doubt. Through the highs and the lows, my promise to you remains unbreakable." 
    },
    { 
        gif: "gif7.gif", p: "hug", title: "Happy Hug Day 🤗", 
        text: "Un madiyil saayum pothu kedaikura nimmathi vera engayum kedaikaathu. You are my home, baby girl. A hug from you feels like the universe is finally in alignment. It's the place where all my fears disappear and only peace remains. I want to spend the rest of my life wrapped in your warmth and your love." 
    },
    { 
        gif: "gif8.gif", p: "kiss", title: "Happy Kiss Day 💋", 
        text: "Milkcake-ey, every time you kiss me, time stops. I'm so lucky to be your man. That one single touch makes me feel like I can conquer the world. It’s the silent way our souls communicate, telling each other things that words could never capture. You are my favorite habit and my most beautiful addiction." 
    }
];

let currentStep = -1;
let fadeInterval;
const inkContent = document.getElementById("inkContent");
const fxLayer = document.getElementById("transition-layer");
const mainGif = document.getElementById("mainGif");

function preloadNext() {
    let nextIdx = currentStep + 1;
    if (nextIdx < stories.length) {
        new Image().src = stories[nextIdx].gif;
    } else if (nextIdx === stories.length) {
        new Image().src = "gif9.gif";
    }
}

function nextStory() {
    currentStep++;
    inkContent.classList.add("hidden");
    clearInterval(fadeInterval);
    fxLayer.innerHTML = "";

    // Change GIF instantly for speed
    if (currentStep < stories.length) {
        mainGif.src = stories[currentStep].gif;
    } else {
        mainGif.src = "gif9.gif";
    }

    setTimeout(() => {
        if (currentStep < stories.length) {
            const data = stories[currentStep];
            document.getElementById("titleText").innerText = data.title;
            document.getElementById("msgText").innerText = data.text;
            document.getElementById("actionArea").innerHTML = `<button class="next-btn" onclick="nextStory()">Next Page 📖</button>`;
            startFadingSequence(pngs[data.p]);
            preloadNext();
        } else {
            loadProposal();
        }
        inkContent.classList.remove("hidden");
    }, 400); 
}

function startFadingSequence(imgUrl) {
    // Spawn 3 immediately
    for(let i=0; i<3; i++) setTimeout(() => spawnOne(imgUrl), i*500);
    // Maintain 5-6 at a time (interval + duration)
    fadeInterval = setInterval(() => {
        spawnOne(imgUrl);
    }, 800); 
}

function spawnOne(url) {
    let img = document.createElement("img");
    img.src = url;
    img.className = "fading-png";
    img.style.left = (Math.random() * 80 + 5) + "vw";
    img.style.top = (Math.random() * 80 + 5) + "vh";
    let randomRot = (Math.random() * 60 - 30) + "deg";
    img.style.setProperty('--rotation', randomRot);
    img.style.width = (Math.random() * 30 + 80) + "px"; 
    fxLayer.appendChild(img);
    setTimeout(() => { img.remove(); }, 4000);
}

function loadProposal() {
    document.getElementById("titleText").innerText = "En Uyir Pondati...";
    document.getElementById("msgText").innerText = "You have walked through these days with me, but I want you to walk through every single day of my life. You are the rhythm to my heart and the peace to my mind. Will you be my Valentine forever and ever? I promise to love you more than words can ever describe.";
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
    inkContent.classList.add("hidden");
    setTimeout(() => {
        mainGif.src = "gif10.gif";
        document.getElementById("titleText").innerText = "My Forever Love! 🎉";
        document.getElementById("msgText").innerHTML = `
            Every single day with you feels like a beautiful dream that I never want to wake up from. You are my soulmate, my best friend, and the love of my life. I am so incredibly grateful to have you by my side. <br><br>
            Our journey is just beginning, and I cannot wait to see all the beautiful memories we will create together. You make me a better person just by being in my life. I promise to cherish you, respect you, and love you unconditionally for the rest of our days. <br><br>
            You are my everything, <strong>en chellam</strong>. My heart belongs to you now and forever. Thank you for being the most amazing <strong>pondati</strong> a man could ever ask for. I love you more than all the stars in the sky.
        `;
        document.getElementById("actionArea").innerHTML = `
            <a href="tel:9353781514" class="call-btn">Call your purushan 📞</a>
        `;
        inkContent.classList.remove("hidden");
    }, 400);
}

function dodge() {
    const btn = document.getElementById("btnNo");
    if (!btn) return;
    btn.style.position = "fixed";
    btn.style.left = Math.random() * (window.innerWidth - 120) + "px";
    btn.style.top = Math.random() * (window.innerHeight - 60) + "px";
}

// Initialize preloader
new Image().src = "gif1.gif";
