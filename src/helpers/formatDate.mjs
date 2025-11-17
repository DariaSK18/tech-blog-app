import dayjs from "dayjs";

export default function formatDate(blogs) {
   return blogs.map((blog) => ({
    ...blog._doc,
    formattedCreatedDate: dayjs(blog.createdAt).format("DD MMM YYYY"),
    formattedUpdatedDate: dayjs(blog.updatedAt).format("DD MMM YYYY"),
  }));
  
}