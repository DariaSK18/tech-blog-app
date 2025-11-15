
const blogForm = document.getElementById("blogForm");

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