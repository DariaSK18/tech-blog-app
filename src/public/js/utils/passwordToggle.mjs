const passwordFields = document.querySelectorAll('input[type="password"]');

// --- eye for psw ---

if (passwordFields) {
  passwordFields.forEach((input) => {
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    toggleBtn.classList.add("toggle-password");

    input.insertAdjacentElement("afterend", toggleBtn);

    toggleBtn.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      } else {
        input.type = "password";
        toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  });
}
