// Bulletproof Icons8 3D PNGs. 
// "img" is the main floating image. "fallImg" is the raining image.
const stories = [
    { 
        img: "https://img.icons8.com/fluency/240/rose.png", 
        fallImg: "https://img.icons8.com/fluency/96/rose.png", 
        title: "Rose Day", text: "chellaameee, a single rose is beautiful, but it completely pales in comparison to you." 
    },
    { 
        img: "https://img.icons8.com/fluency/240/diamond-ring.png", 
        fallImg: "https://img.icons8.com/fluency/96/diamond-ring.png", 
        title: "Propose Day", text: "thangameee, I want to spend every single second of my life unfolding my love for you." 
    },
    { 
        img: "https://img.icons8.com/fluency/240/chocolate-bar.png", 
        fallImg: "https://img.icons8.com/fluency/96/chocolate-bar.png", 
        title: "Chocolate Day", text: "vairameeeeeee, my life is infinitely sweeter simply because you are a part of it." 
    },
    { 
        img: "https://img.icons8.com/fluency/240/teddy-bear.png", 
        fallImg: "https://img.icons8.com/fluency/96/teddy-bear.png", 
        title: "Teddy Day", text: "pondatiiiiiiiiiiii, you are my ultimate peace and my absolute favorite safe space." 
    },
    { 
        img: "https://img.icons8.com/fluency/240/handshake.png", 
        fallImg: "https://img.icons8.com/fluency/96/handshake.png", 
        title: "Promise Day", text: "azhagiiiiiiiiiiiiiii, I promise to hold your hand through every dark night." 
    },
    { 
        img: "https://img.icons8.com/fluency/240/hugging-face.png", 
        fallImg: "https://img.icons8.com/fluency/96/hugging-face.png", 
        title: "Hug Day", text: "baby gurllllllllll, wrapping my arms around you is the only magic I need." 
    },
    { 
        img: "https://img.icons8.com/color/240/lips--v1.png", 
        fallImg: "https://img.icons8.com/color/96/lips--v1.png", 
        title: "Kiss Day", text: "milkcake ehhhhh, one kiss from you makes the whole world fade away." 
    }
];

let currentStep = -1;
const paperCard = document.getElementById("paperCard");
const inkContent = document.getElementById("inkContent");
const fxLayer = document.getElementById("transition-layer");
const mainGif = document.getElementById("mainGif");

function startJourney() {
    nextStory();
}

function nextStory() {
    currentStep++;
    inkContent.classList.add("hidden");

    // Get the exact raining image for this specific day
    let currentFallImg = "https://img.icons8.com/color/96/lips--v1.png"; // Default to kiss
    if (currentStep < stories.length) {
        currentFallImg = stories[currentStep].fallImg;
    }

    // Trigger lag-free screen fill
    triggerScreenFill(currentFallImg);

    setTimeout(() => {
        if (currentStep < stories.length) {
            mainGif.src = stories[currentStep].img;
            document.getElementById("titleText").innerText = stories[currentStep].title;
            document.getElementById("msgText").innerText = stories[currentStep].text;
            document.getElementById("actionArea").innerHTML = `<button class="next-btn" onclick="nextStory()">Next Page 📖</button>`;
        } else if (currentStep === 7) {
            loadProposal();
        }
        
        paperCard.classList.remove("unwrap-anim");
        void paperCard.offsetWidth;
        paperCard.classList.add("unwrap-anim");
        inkContent.classList.remove("hidden");

    }, 1500); // Wait for items to cover screen before revealing text
}

function loadProposal() {
    mainGif.src = "https://img.icons8.com/fluency/240/heart-with-pulse.png";
    document.getElementById("titleText").innerText = "My Pondati...";
    document.getElementById("msgText").innerText = "Will you do me the absolute honor of being my Valentine forever?";
    document.getElementById("actionArea").innerHTML = `
        <div class="btn-group">
            <button id="btnYes" onclick="showFinal()">Yes! ❤️</button>
            <button id="btnNo" onmouseover="dodge()" ontouchstart="dodge()">No</button>
        </div>
    `;
}

function showFinal() {
    inkContent.classList.add("hidden");
    triggerScreenFill("https://img.icons8.com/color/96/lips--v1.png"); 

    setTimeout(() => {
        mainGif.src = "https://img.icons8.com/fluency/240/partying-face.png";
        document.getElementById("titleText").innerText = "She said YES! 🎉";
        document.getElementById("msgText").innerText = "Happy Valentine's Day! I love you to the moon and back!";
        document.getElementById("actionArea").innerHTML = ""; 
        
        paperCard.classList.remove("unwrap-anim");
        void paperCard.offsetWidth;
        paperCard.classList.add("unwrap-anim");
        inkContent.classList.remove("hidden");
        
    }, 1500);
}

// --- OPTIMIZED, LAG-FREE SCREEN FILLING ENGINE ---

function triggerScreenFill(imgSrc) {
    // Reduced to 45 items to prevent mobile lag, but made them larger
    for(let i = 0; i < 45; i++) {
        setTimeout(() => {
            spawnItem(imgSrc);
        }, i * 30); 
    }
}

function spawnItem(imgSrc) {
    let img = document.createElement("img");
    img.src = imgSrc;
    img.classList.add("falling-item");
    
    // Size is larger so fewer items are needed to cover the screen
    let size = Math.random() * 0.8 + 0.8; 
    let duration = Math.random() * 1.5 + 2; 
    let startX = (Math.random() * 100) + "vw";
    
    // Assign CSS variables for hardware acceleration
    img.style.setProperty('--startX', startX);
    img.style.transform = `scale(${size})`;
    img.style.animationDuration = duration + "s";
    
    fxLayer.appendChild(img);
    setTimeout(() => img.remove(), duration * 1000);
}

function dodge() {
    const btnNo = document.getElementById("btnNo");
    btnNo.style.position = "absolute";
    const maxX = window.innerWidth - btnNo.clientWidth - 20;
    const maxY = window.innerHeight - btnNo.clientHeight - 20; 
    btnNo.style.left = Math.max(10, Math.random() * maxX) + "px";
    btnNo.style.top = Math.max(10, Math.random() * maxY) + "px";
}
