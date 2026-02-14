const pngs = { rose: "png1.png", ring: "png2.png", choco: "png3.png", teddy: "png4.png", promise: "png5.png", hug: "png6.png", kiss: "png7.png" };
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
const paperCard = document.getElementById("paperCard");
const fxLayer = document.getElementById("transition-layer");
const mainGif = document.getElementById("mainGif");

// SINGLE TAP LOGIC (Left/Right)
document.body.addEventListener('click', (e) => {
    // Stop navigation if clicking buttons or links
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.btn-group')) {
        return;
    }

    if (e.clientX > window.innerWidth / 2) {
        navigate(1); // Right tap -> Next
    } else {
        navigate(-1); // Left tap -> Previous
    }
});

window.showFinal = function() {
    paperCard.classList.add("story-out-next");
    setTimeout(() => {
        paperCard.classList.remove("story-out-next");
        mainGif.src = "gif10.gif";
        document.getElementById("titleText").innerText = "My Forever Love! 🎉";
        document.getElementById("msgText").innerHTML = `
            Every single day with you feels like a beautiful dream that I never want to wake up from. You are my soulmate, my best friend, and the love of my life. I am so incredibly grateful to have you by my side. <br><br>
            Our journey is just beginning, and I cannot wait to see all the beautiful memories we will create together. You make me a better person just by being in my life. I promise to cherish you, respect you, and love you unconditionally for the rest of our days. <br><br>
            You are my everything, <strong>en chellam</strong>. My heart belongs to you now and forever. Thank you for being the most amazing <strong>pondati</strong> a man could ever ask for. I loooooooovvvvvvveeeeeeee yooooouuuuuuu.
        `;
        document.getElementById("actionArea").innerHTML = `<a href="tel:9353781514" class="call-btn">Call your purushan 📞</a>`;
        paperCard.classList.add("story-in");
        setTimeout(() => paperCard.classList.remove("story-in"), 600);
    }, 400);
};

window.dodge = function(e) {
    if (e) e.preventDefault(); // Prevents touch events from acting as clicks on mobile
    const b = document.getElementById("btnNo");
    if(b) {
        b.style.position = "fixed";
        // Safe zone for button jumping so it doesn't go off screen
        const safeX = Math.random() * (window.innerWidth * 0.6) + (window.innerWidth * 0.15);
        const safeY = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.15);
        b.style.left = safeX + "px";
        b.style.top = safeY + "px";
        b.style.zIndex = "99999";
    }
};

function navigate(dir) {
    if (dir === 1 && currentStep >= stories.length) return; 
    if (dir === -1 && currentStep <= -1) return;

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
    fxLayer.innerHTML = "";

    if (currentStep === -1) {
        mainGif.src = "gif1.gif";
        document.getElementById("titleText").innerText = "Hi Pondati ❤️";
        document.getElementById("msgText").innerHTML = "Tap the right side to go next.<br>Tap the left side to go back.";
        document.getElementById("actionArea").innerHTML = "";
    } else if (currentStep < stories.length) {
        const data = stories[currentStep];
        mainGif.src = data.gif;
        document.getElementById("titleText").innerText = data.title;
        document.getElementById("msgText").innerText = data.text;
        document.getElementById("actionArea").innerHTML = "";
        startFadingSequence(pngs[data.p]);
        
        // Preload next gif
        if (currentStep + 1 < stories.length) new Image().src = stories[currentStep + 1].gif;
    } else {
        loadProposal();
    }
}

function startFadingSequence(img) { 
    const spawn = () => {
        let i = document.createElement("img"); i.src = img; i.className = "fading-png";
        i.style.left = Math.random() * 80 + "vw"; i.style.top = Math.random() * 80 + "vh";
        let rot = (Math.random() * 60 - 30) + "deg";
        i.style.setProperty('--rotation', rot);
        i.style.width = "80px"; fxLayer.appendChild(i);
        setTimeout(() => i.remove(), 4000);
    };
    for(let j=0; j<5; j++) setTimeout(spawn, j*500);
    fadeInterval = setInterval(spawn, 1000);
}

function loadProposal() {
    mainGif.src = "gif9.gif";
    document.getElementById("titleText").innerText = "En Uyir Pondati...";
    document.getElementById("msgText").innerText = "You have walked through these days with me, but I want you to walk through every single day of my life. You are the rhythm to my heart and the peace to my mind. Will you be my Valentine forever and ever? I promise to love you more than words can ever describe.";
    document.getElementById("actionArea").innerHTML = `
        <div class="btn-group">
            <button id="btnYes" onclick="window.showFinal()">Yes! ❤️</button>
            <button id="btnNo" onmouseover="window.dodge(event)" ontouchstart="window.dodge(event)">No</button>
        </div>
    `;
    startFadingSequence(pngs.kiss);
}
