import { showMessage } from "../utils/showMessage.mjs";

const loginForm = document.getElementById("loginForm");

// --- login ---
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    const res = await fetch("/api/user/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      window.location.href = "/blogs";
    } else showMessage("Invalid username or password", "error");
  });
}