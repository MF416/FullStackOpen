const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "Operation not permitted" });
  }

  blog.user = user._id;

  if (body.author === undefined || body.title === undefined) {
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    newBlog = await Blog.findById(savedBlog._id).populate("user", {
      username: 1,
      name: 1,
    }); // Added for FSO part 5.8

    response.status(201).json(newBlog);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  const user = request.user;

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());
  console.log("User: ", user);
  console.log("blog: ", blog);

  await user.save();
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    user: body.user,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });
  response.status(200).json(newBlog);
});

blogsRouter.put("/:id/comments", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  const newComments = blog.comments.concat(request.body.comments);

  const updateBlog = {
    user: blog.user,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: newComments,
  }

  newBlog = await Blog.findByIdAndUpdate(request.params.id, updateBlog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });
  response.status(200).json(newBlog);

});

module.exports = blogsRouter;
