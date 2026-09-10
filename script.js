// Day 9 - Save messages with localStorage
console.log("Day 9 loaded - with memory!");

function showContact() {
  let contactInfo = document.getElementById("contact");
  if (contactInfo.style.display === "none") {
    contactInfo.style.display = "block";
  } else {
    contactInfo.style.display = "none";
  }
}

function toggleTheme() {
  let body = document.body;
  body.classList.toggle("dark-mode");
  // BONUS: Save theme choice
  let isDark = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

// Load saved theme on page start
window.addEventListener("load", function() {
  let savedDark = localStorage.getItem("darkMode");
  if (savedDark === "true") {
    document.body.classList.add("dark-mode");
  }
  displayMessages(); // show saved messages on load
});

function sendMessage() {
  let name = document.getElementById("visitorName").value.trim();
  let email = document.getElementById("visitorEmail").value.trim();
  let message = document.getElementById("visitorMessage").value.trim();
  let status = document.getElementById("formStatus");

  if (name === "" || email === "" || message === "") {
    status.textContent = "Please fill in all fields!";
    status.style.color = "red";
    return;
  }

  if (!email.includes("@")) {
    status.textContent = "Please enter a valid email with @";
    status.style.color = "red";
    return;
  }

  // === NEW DAY 9 PART ===
  // 1. Get old messages from localStorage or start empty array
  let messages = JSON.parse(localStorage.getItem("myMessages")) || [];

  // 2. Add new message with date
  let newMsg = {
    name: name,
    email: email,
    message: message,
    date: new Date().toLocaleString()
  };
  messages.push(newMsg);

  // 3. Save back to localStorage
  localStorage.setItem("myMessages", JSON.stringify(messages));

  status.textContent = "Thanks " + name + "! Message saved locally!";
  status.style.color = "green";

  document.getElementById("visitorName").value = "";
  document.getElementById("visitorEmail").value = "";
  document.getElementById("visitorMessage").value = "";

  displayMessages(); // refresh the list
}

function displayMessages() {
  let container = document.getElementById("savedMessages");
  let messages = JSON.parse(localStorage.getItem("myMessages")) || [];

  if (messages.length === 0) {
    container.innerHTML = "<i>No messages yet</i>";
    return;
  }

  let html = "";
  // Show newest first
  for (let i = messages.length - 1; i >= 0; i--) {
    let m = messages[i];
    html += `<div style="background:#f0f2f5; padding:8px; border-radius:6px; margin-bottom:6px;">
      <b>${m.name}</b> (${m.email})<br>
      ${m.message}<br>
      <small style="color:#888;">${m.date}</small>
    </div>`;
  }
  container.innerHTML = html;
}

function clearAllMessages() {
  if (confirm("Clear all saved messages?")) {
    localStorage.removeItem("myMessages");
    displayMessages();
  }
}