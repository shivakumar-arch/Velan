// Reliable Tenor GIF Links
const stories = [
    { gif: "https://media.tenor.com/lM5zS9-rFp4AAAAi/bubu-dudu-bubu.gif", title: "Rose Day", text: "chellaameee, a single rose is beautiful, but it completely pales in comparison to you." },
    { gif: "https://media.tenor.com/A65_bB1EtiMAAAAi/peach-cat-propose.gif", title: "Propose Day", text: "thangameee, I want to spend every single second of my life unfolding my love for you." },
    { gif: "https://media.tenor.com/Jb9kGfK4nLEAAAAi/bubu-dudu-bubu.gif", title: "Chocolate Day", text: "vairameeeeeee, my life is infinitely sweeter simply because you are a part of it." },
    { gif: "https://media.tenor.com/8QGzQ21mJg4AAAAi/tkthao219-bubududu.gif", title: "Teddy Day", text: "pondatiiiiiiiiiiii, you are my ultimate peace and my absolute favorite safe space." },
    { gif: "https://media.tenor.com/39hP_IqW2J0AAAAi/pink-and.gif", title: "Promise Day", text: "azhagiiiiiiiiiiiiiii, I promise to hold your hand through every dark night." },
    { gif: "https://media.tenor.com/Ztw1z9dF8D4AAAAi/bubu-dudu-bubu.gif", title: "Hug Day", text: "baby gurllllllllll, wrapping my arms around you is the only magic I need." },
    { gif: "https://media.tenor.com/vH9ZJ4n0pU0AAAAi/tkthao219-bubududu.gif", title: "Kiss Day", text: "milkcake ehhhhh, one kiss from you makes the whole world fade away." }
];

let currentStep = -1;
const paperCard = document.getElementById("paperCard");
const inkContent = document.getElementById("inkContent");
const fxLayer = document.getElementById("transition-layer");
const mainGif = document.getElementById("mainGif");

// Highly reliable Wikimedia link for the exact red lipstick kiss you wanted
const kissUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Kiss_mark_lipstick.svg/512px-Kiss_mark_lipstick.svg.png";

function startJourney() {
    nextStory();
}

function nextStory() {
    currentStep++;
    
    inkContent.classList.add("hidden");

    let animType = 'rose'; 
    if (currentStep < stories.length) {
        if (stories[currentStep].title.includes("Chocolate")) animType = 'choco';
        else if (stories[currentStep].title.includes("Kiss")) animType = 'kiss';
    } else if (currentStep === 7) {
        animType = 'kiss'; 
    }

    // Trigger MASSIVE screen fill
    triggerScreenFill(animType);

    setTimeout(() => {
        if (currentStep < stories.length) {
            mainGif.src = stories[currentStep].gif;
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

    }, 2000); // 2 second delay for items to fall
}

function loadProposal() {
    mainGif.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
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
    triggerScreenFill('kiss'); 

    setTimeout(() => {
        mainGif.src = "https://media.tenor.com/IVKKi1R5uc4AAAAi/goma-happy.gif";
        document.getElementById("titleText").innerText = "She said YES! 🎉";
        document.getElementById("msgText").innerText = "Happy Valentine's Day! I love you to the moon and back!";
        document.getElementById("actionArea").innerHTML = ""; 
        
        paperCard.classList.remove("unwrap-anim");
        void paperCard.offsetWidth;
        paperCard.classList.add("unwrap-anim");
        inkContent.classList.remove("hidden");
        
        setInterval(() => spawnItem('kiss'), 600);
    }, 2000);
}

// --- BULLETPROOF SCREEN FILLING ENGINE ---

function triggerScreenFill(type) {
    // Spawns 150 items to cover the screen
    for(let i = 0; i < 150; i++) {
        setTimeout(() => {
            spawnItem(type);
        }, i * 20); // Spawns very rapidly
    }
}

function spawnItem(type) {
    let item = document.createElement("div");
    item.classList.add("falling-item");
    
    // Using Emojis for Roses and Chocolate so they NEVER break or corrupt.
    // Using the image link for the Kiss.
    if (type === 'choco') {
        item.innerHTML = "🍫";
        item.classList.add("emoji-drop");
    } else if (type === 'kiss') {
        let img = document.createElement("img");
        img.src = kissUrl;
        img.classList.add("kiss-png");
        item.appendChild(img);
    } else {
        item.innerHTML = "🌹";
        item.classList.add("emoji-drop");
    }
    
    item.style.left = (Math.random() * 100) + "vw";
    let size = Math.random() * 0.8 + 0.5; 
    item.style.transform = `scale(${size})`;
    
    let duration = Math.random() * 2 + 2.5; 
    item.style.animationDuration = duration + "s";
    
    fxLayer.appendChild(item);
    setTimeout(() => item.remove(), duration * 1000);
}

function dodge() {
    const btnNo = document.getElementById("btnNo");
    btnNo.style.position = "absolute";
    const maxX = window.innerWidth - btnNo.clientWidth - 30;
    const maxY = window.innerHeight - btnNo.clientHeight - 30; 
    btnNo.style.left = Math.max(10, Math.random() * maxX) + "px";
    btnNo.style.top = Math.max(10, Math.random() * maxY) + "px";
}
