// Day 7 - My first JavaScript 
console.log(" JavaScript is connected! Hello Solomon");

function showContact() {
    // Find the hidden text by its ID
    let contactInfo = document.getElementById("contact");
    // If hidden, show it. If shown, hide it
    if (contactInfo.style.display === "none") {
        contactInfo.style.display = "block"; 
    } else {
        contactInfo.style.display = "none";
    }
}

function toggleTheme() {
    // Find the body of the page
    let body = document.body;
    // Add or remove dark class
body.classList.toggle("dark-mode");
}