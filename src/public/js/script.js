// --- forms and btns ---
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const blogForm = document.getElementById("blogForm");
const logoutBtns = document.querySelectorAll(".logout");
const blogsList = document.querySelector(".blogs-list");

// --- show message ---
function showMessage(text, type, duration = 3000) {
  const msg = document.getElementById("message");
  if (!msg) return;

  msg.innerText = text;
  msg.className = `message show ${type}`;

  setTimeout(() => {
    msg.classList.remove("show");
  }, duration);
}


// --- registration ---

// --- login ---

// --- logout ---

// --- blog create / update ---

// --- delete / edit blog ---

// --- change psw ---

// --- delete user ---

// --- eye for psw ---