const passwordFields = document.querySelectorAll('input[type="password"]');
const inputWrapper = document.querySelector('.search-box')

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

// --- hide icon ---
if(inputWrapper){
  const input = document.querySelector('input')
  const icon = document.querySelector('.search-icon')

  const toggleIcon = () => {
    if(input.value.trim() === '') icon.style.opacity = '1'
    else icon.style.opacity = '0'
  }

  toggleIcon()
  input.addEventListener('input', toggleIcon)
}
