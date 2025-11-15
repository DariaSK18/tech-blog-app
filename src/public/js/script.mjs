// --- forms and btns ---


const blogForm = document.getElementById("blogForm");

const blogsList = document.querySelector(".blogs-list");

const searchForm = document.getElementById("searchForm");


const passwordFields = document.querySelectorAll('input[type="password"]');


// --- blog create / update ---
if (blogForm) {
  const blogId = blogForm.dataset.id;
  console.log(blogId);

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

// --- delete ---
if (blogsList) {
  blogsList.addEventListener("click", async (e) => {
    const item = e.target.closest("li");
    if (!item) return;

    const id = item.getAttribute("id");

    if (e.target.classList.contains("deleteBlog")) {
      const ok = confirm("Delete blog?");
      if (!ok) return;

      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showMessage("Deleted", "success");
        setTimeout(() => {
          location.reload();
        }, 300);
      }
    }

    if (e.target.classList.contains("editBlog")) {
      // const li = clicked.closest("li");
      // const id = li.getAttribute("id");
      window.location.href = `/write-blog/${id}`;
    }
  });
}

// --- search by title ---
if (searchForm) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = searchForm.query.value.trim();
    if (!query) return;

    window.location.href = `/blogs?search=${encodeURIComponent(query)}`;
  });
}

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
