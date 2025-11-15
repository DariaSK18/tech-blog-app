import { showMessage } from "../utils/showMessage.mjs";

const registerForm = document.getElementById("registerForm");

// --- registration ---
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = registerForm.username.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    const confirmation = registerForm.confirmation.value.trim();

    if (!username || !email || !password || !confirmation) {
      showMessage("All fields are required", "error");
      return;
    }
    if (password !== confirmation) {
      showMessage("Passwords don't match", "error");
      return;
    }
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (res.ok) {
        showMessage("Registration successful!", "success");
        setTimeout(() => {
          window.location.href = "/login";
        }, 300);
      } else {
        showMessage("Registration failed", "error");
      }
    } catch (error) {
      console.log(error);
    }
  });
}