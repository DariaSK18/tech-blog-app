const blogsList = document.querySelector(".blogs-list");

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