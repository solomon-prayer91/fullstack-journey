// Day 9 - Save messages with localStorage
console.log("Day 9 loaded - with memory!");

  function showContact() {
  let contactForm = document.getElementById("contactForm");
  if (contactForm.style.display === "none" || contactForm.style.display === "") {
    contactForm.style.display = "block";
  } else {
    contactForm.style.display = "none";
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

   async function sendMessage(event) {
  if (event) event.preventDefault(); // stop page reload

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

  status.textContent = "Sending...";
  status.style.color = "#666";

  // 1. Save locally first (your Day 9-10 logic)
  let messages = JSON.parse(localStorage.getItem("myMessages")) || [];
  messages.push({ name, email, message, date: new Date().toLocaleString() });
  localStorage.setItem("myMessages", JSON.stringify(messages));
  displayMessages();

  // 2. Send to real email via FormSubmit
  try {
    let form = document.getElementById("contactForm");
    let formData = new FormData(form);
    
    let response = await fetch(form.action, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      status.textContent = "Thanks " + name + "! Message sent to my real inbox!";
      status.style.color = "green";
      form.reset();
    } else {
      status.textContent = "Saved locally, but email failed. I will see it in local list.";
      status.style.color = "orange";
    }
  } catch (err) {
    status.textContent = "Saved locally! Email needs internet, check later.";
    status.style.color = "orange";
    console.log("Email error:", err);
  }
}

// Connect new form submit to function
document.addEventListener("DOMContentLoaded", function() {
  let form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", sendMessage);
  }
});

  function displayMessages() {
  let container = document.getElementById("savedMessages");
  let messages = JSON.parse(localStorage.getItem("myMessages")) || [];

  if (messages.length === 0) {
    container.innerHTML = "<i style='color:#999;'>No messages yet - be the first!</i>";
    return;
  }

  let html = "";
  for (let i = messages.length - 1; i >= 0; i--) {
    let m = messages[i];
    // i is the real index in the array, we need it to delete
    let realIndex = i;
    html += `<div style="background:#f0f2f5; padding:10px; border-radius:8px; margin-bottom:8px; position:relative; border-left:4px solid #24292f;">
      <div style="display:flex; justify-content:space-between;">
        <b style="color:#24292f;">${m.name}</b>
        <span style="display:flex; gap:8px; align-items:center;">
          <small style="color:#888;">${m.date}</small>
          <button onclick="deleteMessage(${realIndex})" style="background:#ff4444; color:white; border:none; border-radius:50%; width:22px; height:22px; cursor:pointer; font-size:12px; line-height:1;">X</button>
        </span>
      </div>
      <div style="font-size:12px; color:#666; margin:2px 0;">${m.email}</div>
      <div style="margin-top:4px;">${m.message}</div>
    </div>`;
  }
  container.innerHTML = html;
}

function deleteMessage(index) {
  // Get all messages
  let messages = JSON.parse(localStorage.getItem("myMessages")) || [];

  // Remove 1 item at position index
  messages.splice(index, 1);

  // Save back
  localStorage.setItem("myMessages", JSON.stringify(messages));

  // Refresh display
  displayMessages();
}

function clearAllMessages() {
  if (confirm("Are you sure? This will delete all saved messages!")) {
    localStorage.removeItem("myMessages");
    displayMessages();
  }
}

  