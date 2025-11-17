import { Blog } from "../mongoose/schemas/blog.mjs";
import formatDate from "../helpers/formatDate.mjs";

export const homePage = async(req, res) => {
  const blogs = await Blog.find().populate("author").sort({ createdAt: -1 })
  const formattedBlogs = formatDate(blogs)
  res.render("index", { title: "Home", blogs: formattedBlogs });
};
export const loginPage = (req, res) => {
  res.render("login", { title: "Login" });
};
export const registerPage = (req, res) => {
  res.render("register", { title: "Register" });
};
export const profilePage = (req, res) => {
  res.render("profile", { title: "Profile", user: req.user });
};

export const blogsPage = async (req, res) => {
  const { search, tag } = req.query;
  const filter = {};
  if (search) filter.title = { $regex: `\\b${search}`, $options: "i" };
  if (tag) filter.tags = tag;
  const blogs = await Blog.find(filter).populate("author");

const formattedBlogs = formatDate(blogs)

  res.render("blogs", {
    title: "Blogs",
    blogs: formattedBlogs,
    user: req.user,
  });
};
export const changePswPage = (req, res) => {
  res.render("change-psw", { title: "Edit" });
};
// export const writeBlogPage = (req, res) => {
//   const {params: {id}} = req
//   res.render("write-blog", { title: "Write blog", id });
// };

export const writeBlogPage = async (req, res) => {
  const {
    params: { id },
  } = req;

  let blog = null;
  if (id) blog = await Blog.findById(id);
  // console.log(id);

  res.render("write-blog", {
    title: id ? "Edit blog" : "Write blog",
    id,
    blog,
  });
};
