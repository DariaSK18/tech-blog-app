// --- show message ---
export function showMessage(text, type, duration = 3000) {
  const msg = document.getElementById("message");
  if (!msg) return;

  msg.innerText = text;
  msg.className = `message show ${type}`;

  setTimeout(() => {
    msg.classList.remove("show");
  }, duration);
}