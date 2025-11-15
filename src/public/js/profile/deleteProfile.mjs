const deleteBtn = document.getElementById("delete");

// --- delete user ---
if (deleteBtn) {
  deleteBtn.addEventListener("click", async () => {
    const confirmation = confirm("Delete profile?");
    if (!confirmation) return;

    try {
      const res = await fetch("/api/user/me", {
        method: "DELETE",
        credentials: "same-origin",
      });

      if (res.ok) {
        showMessage("Profile deleted successfully!", "success");
        setTimeout(() => {
          window.location.href = "/register";
        }, 300);
      } else showMessage("Failed to delete profile!", "error");
    } catch (error) {
      console.log(error);
    }
  });
}