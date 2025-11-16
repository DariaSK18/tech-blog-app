import { showMessage } from "../utils/showMessage.mjs";
const blogsList = document.querySelector(".blogs-list");
const showAllBtn = document.querySelector(".main__show-all");
const likeBtns = document.querySelectorAll(".like-btn");

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

// --- show all blogs btn ---
if (showAllBtn) {
  showAllBtn.addEventListener("click", () => {
    window.location.href = "/blogs";
  });
}

// --- toggle like btn ---
if (likeBtns) {
  likeBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const blogId = btn.dataset.blogId;

      try {
        const res = await fetch(`/api/blog/${blogId}/like`, {
          method: "PATCH",
          credentials: "same-origin",
        });
        if (!res.ok) {
          console.log(res.status);
          
          if (res.status === 401 || res.status === 500) {
            showMessage("You must be logged in to like a post", "error");
            return;
          }
        }
        const data = await res.json();
        if(data.likes !== undefined) {
          btn.querySelector(".likes-count").innerText = data.likes;
        btn.classList.toggle("liked", data.liked);
        }
        
      } catch (error) {
        console.log(error);
      }
    });
  });
}
