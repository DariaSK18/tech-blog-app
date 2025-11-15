const searchForm = document.getElementById("searchForm");

// --- search by title ---
if (searchForm) {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = searchForm.query.value.trim();
    if (!query) return;

    window.location.href = `/blogs?search=${encodeURIComponent(query)}`;
  });
}