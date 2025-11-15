const changePswForm = document.getElementById("changePswForm");

// --- change psw ---
if (changePswForm) {
  changePswForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentPsw = changePswForm.currentPsw.value.trim();
    const newPsw = changePswForm.newPsw.value.trim();
    const confirmPsw = changePswForm.confirmPsw.value.trim();

    if (!currentPsw || !newPsw || !confirmPsw) {
      showMessage("All fields are required!", "error");
      return;
    }

    if (newPsw !== confirmPsw) {
      showMessage("Passwords don't match!", "error");
      return;
    }

    const formData = { currentPsw, password: newPsw };

    try {
      const res = await fetch("/api/user/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showMessage("Password changed successfully!", "success");

        changePswForm.reset();
        setTimeout(() => {
          window.location.href = "/blogs";
        }, 300);
      } else {
        const error = await res.json();
        showMessage(error.msg || "Failed to change password!", "error");
      }
    } catch (error) {
      console.log(error);
      showMessage("Error updating password", "error");
    }
  });
}