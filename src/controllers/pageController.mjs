export const homePage = (req, res) => {
  res.render("index", { title: "Home" });
};
export const loginPage = (req, res) => {
  res.render("login", { title: "Login" });
};
export const registerPage = (req, res) => {
  res.render("register", { title: "Register" });
};
export const profilePage = (req, res) => {
  res.render("profile", { title: "Profile" });
};

export const blogsPage = (req, res) => {
  res.render("blogs", { title: "Blogs" });
};
export const changePswPage = (req, res) => {
  res.render("change-psw", { title: "Edit" });
};
export const writeBlogPage = (req, res) => {
  res.render("write-blog", { title: "Write blog" });
};
