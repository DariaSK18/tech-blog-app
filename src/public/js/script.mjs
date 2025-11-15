// --- forms and btns ---

const passwordFields = document.querySelectorAll('input[type="password"]');

// --- eye for psw ---

if (passwordFields) {
  passwordFields.forEach((input) => {
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.innerText = "show";
    toggleBtn.classList.add("toggle-password");

    input.insertAdjacentElement("afterend", toggleBtn);

    toggleBtn.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        toggleBtn.innerText = "hide";
      } else {
        input.type = "password";
        toggleBtn.innerText = "show";
      }
    });
  });
}
