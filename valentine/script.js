let current = 1;

function showPage(n) {
    document.querySelector(".active").classList.remove("active");
    document.getElementById("page" + n).classList.add("active");
}

document.getElementById("yesBtn").onclick = function() {
    showPage(2);
}

// Fixed Dodging Logic for "No" Button
let noBtn = document.getElementById("noBtn");

function dodge(btn) {
    btn.style.position = "absolute";
    let x = Math.random() * (window.innerWidth - btn.offsetWidth - 20);
    let y = Math.random() * (window.innerHeight - btn.offsetHeight - 20);
    btn.style.left = Math.max(10, x) + "px";
    btn.style.top = Math.max(10, y) + "px";
}

noBtn.addEventListener("mouseover", function() { dodge(noBtn); });
noBtn.addEventListener("touchstart", function(e) { 
    e.preventDefault(); 
    dodge(noBtn); 
});

/* --- SCREEN FILLING ENGINES --- */
// Reliable online image sources
const chocoImg = "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f36b.svg";
const kissImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Kiss_mark_lipstick.svg/512px-Kiss_mark_lipstick.svg.png";

function createChocolate() {
    if(!document.getElementById("page3").classList.contains("active")) return;

    let drop = document.createElement("img");
    drop.src = chocoImg;
    drop.classList.add("falling-item", "chocolate");
    
    drop.style.left = Math.random() * window.innerWidth + "px";
    drop.style.animationDuration = (Math.random() * 2 + 2) + "s"; // Random fall speed
    
    document.getElementById("chocoLayer").appendChild(drop);

    // Prevents phone crashing by deleting after falling
    setTimeout(() => drop.remove(), 4000);
}
// 50ms interval creates a MASSIVE rainstorm of chocolates
setInterval(createChocolate, 50); 


function createKiss() {
    if(!document.getElementById("page4").classList.contains("active")) return;

    let kiss = document.createElement("img");
    kiss.src = kissImg;
    kiss.classList.add("falling-item", "kiss");
    
    kiss.style.left = Math.random() * 100 + "vw"; // Full screen width
    kiss.style.animationDuration = (Math.random() * 1.5 + 2) + "s";
    
    // Rotate for realism
    let rot = Math.floor(Math.random() * 360);
    kiss.style.transform = `rotate(${rot}deg)`;
    
    document.getElementById("kissLayer").appendChild(kiss);

    setTimeout(() => kiss.remove(), 4000);
}
// 40ms interval completely covers the screen in kisses
setInterval(createKiss, 40);
