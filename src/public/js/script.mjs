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
if(registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const username = registerForm.username.value.trim()
        const email = registerForm.email.value.trim()
        const password = registerForm.password.value.trim()
        const confirmation = registerForm.confirmation.value.trim()

        if(!username || !email || !password || !confirmation) {
            showMessage('All fields are required', 'error')
            return
        }
        if(password !== confirmation) {
            showMessage('Passwords don\'t match', 'error')
            return
        }
        try {
            const res = await fetch('/api/user', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, email, password})
            })
            if (res.ok) {
                showMessage("Registration successful!", "success")
                setTimeout(()=>{
                    window.location.href = '/login'
                }, 300)
            }else {
        showMessage("Registration failed", "error");
      }
        } catch (error) {
            console.log(error);
            
        }
    })
}

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
