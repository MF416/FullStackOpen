const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "First blogpost Test",
    author: "John Smith",
    url: "url.com",
    likes: 15,
  },
  {
    title: "Second blogpost Test",
    author: "Feynmann",
    url: "wikipedia.org",
    likes: 450,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
