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

function sendMessage() {
    //Get values from the inputs
    let name = document.getElementById("visitorName").value.trim();
    let email = document.getElementById("visitorEmail").value.trim();
    let message = document.getElementById("visitorMessage").value.trim();
    let status = document.getElementById("formStatus");

    // Validation - check if empty
    if (name === " " || email === " " || message === " ") {
        status.textContent = "Please fill in all fields!";
        status.style.color = "red";
        return; //stop here
    }

    // Simple email check - must contain @
    if (!email.includes("@")) {
        status.textContent = "Please enter a valid email with @";
        status.style.color = "red";
        return; // stop here
    }

    // If we reach here, everything is good
    status.textContent = "Thanks " + name + "! Message sent (demo). I will reply at " + email;
    status.style.color = "green";

    // Clear inputs
    document.getElementById("visitorName").value = " ";
    document.getElementById("visitorEmail").value = " ";
    document.getElementById("visitorMessage").value = " ";

}