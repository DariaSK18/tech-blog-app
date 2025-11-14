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
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    // const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    const res = await fetch("/api/user/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      window.location.href = "/api/blog";
    } else showMessage("Invalid username or password", "error");
  });
}

// --- logout ---
logoutBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const res = await fetch("/api/user/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    if (res.ok) window.location.href = "/login";
  });
});

// --- blog create / update ---

// --- delete / edit blog ---

// --- change psw ---

// --- delete user ---

// --- eye for psw ---
