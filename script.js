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

// Realistic PNG URLs for each day
const pngUrls = {
    'rose': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rosa_Precious_Platinum.jpg/240px-Rosa_Precious_Platinum.jpg', // Realistic Red Rose
    'propose': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Diamond_ring.png/240px-Diamond_ring.png', // Realistic Ring
    'choco': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Chocolate.png/240px-Chocolate.png', // Realistic Chocolate Bar
    'teddy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Teddy_bear.png/240px-Teddy_bear.png', // Realistic Teddy Bear
    'promise': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Pinky_promise.png/240px-Pinky_promise.png', // Realistic Pinky Promise
    'hug': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Hugging_emoji.png/240px-Hugging_emoji.png', // Realistic Hug
    'kiss': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Kiss_mark_lipstick.svg/512px-Kiss_mark_lipstick.svg.png' // Your specific lipstick kiss
};

function startJourney() {
    nextStory();
}

function nextStory() {
    currentStep++;
    
    inkContent.classList.add("hidden");

    let animType = 'rose'; // Default
    if (currentStep < stories.length) {
        let title = stories[currentStep].title.toLowerCase();
        if (title.includes("rose")) animType = 'rose';
        else if (title.includes("propose")) animType = 'propose';
        else if (title.includes("chocolate")) animType = 'choco';
        else if (title.includes("teddy")) animType = 'teddy';
        else if (title.includes("promise")) animType = 'promise';
        else if (title.includes("hug")) animType = 'hug';
        else if (title.includes("kiss")) animType = 'kiss';
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
    
    let img = document.createElement("img");
    img.src = pngUrls[type];
    
    if (type === 'kiss') {
        img.classList.add("kiss-png");
    } else {
        img.classList.add("falling-png");
    }
    
    item.appendChild(img);
    
    item.style.left = (Math.random() * 100) + "vw";
    let size = Math.random() * 0.8 + 0.6; 
    item.style.transform = `scale(${size})`;
    
    let duration = Math.random() * 2 + 2.5; 
    item.style.animationDuration = duration + "s";
    
    fxLayer.appendChild(item);
    setTimeout(() => item.remove(), duration * 1000);
}

function dodge() {
    const btnNo = document.getElementById("btnNo");
    btnNo.style.position = "absolute";
    const maxX = window.innerWidth - btnNo.clientWidth - 40;
    const maxY = window.innerHeight - btnNo.clientHeight - 40; 
    btnNo.style.left = Math.max(20, Math.random() * maxX) + "px";
    btnNo.style.top = Math.max(20, Math.random() * maxY) + "px";
}
