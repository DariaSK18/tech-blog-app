// import { showMessage } from "../utils/showMessage.mjs";

const logoutBtns = document.querySelectorAll(".logout");

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