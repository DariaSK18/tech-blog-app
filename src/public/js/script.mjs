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
if (blogForm) {
  const blogId = blogForm.dataset.blogId;
  blogForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = blogForm.title.value.trim();
    const content = blogForm.content.value.trim();
    const tags = blogForm.tags.value
      .trim()
      .split(",")
      .map((tag) => tag.trim());

    if (!title || !content) {
      showMessage("Title and content required", "error");
      return;
    }

    const url = blogId ? `/api/blog/${blogId}` : "/api/blog";
    const method = blogId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, tags }),
    });

    if (res.ok) {
      showMessage("Saved!", "success");
      setTimeout(() => {
        window.location.href = "/blogs";
      }, 300);
    } else {
      showMessage("Failed", "error");
    }
  });
}

// --- delete / edit blog ---
if(blogsList) {[
  blogsList.addEventListener("click", async (e) => {
    const item = e.target.closest('li')
    if(!item) return

    const id = item.getAttribute('id')

    if(e.target.classList.contains('deleteBlog')) {
      const ok = confirm("Delete blog?")
      if(!ok) return
    }
    const res = await fetch(`/api/blog/${id}`, {
      method: "DELETE"
    })

    if(res.ok) {
      showMessage('Deleted', "success")
      setTimeout(() => {
        location.reload()
      }, 300)
    }

    if(e.target.classList.contains('editBlog')) {
      window.location.href = `/write-blog/${id}`
    }
  })
]}

// --- change psw ---

// --- delete user ---

// --- eye for psw ---
