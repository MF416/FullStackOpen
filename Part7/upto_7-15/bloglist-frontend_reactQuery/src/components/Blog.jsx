import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogservice from "../services/blogs";
import { useUserValue } from "../reducers/UserContext";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const user = useUserValue();
  const showWhenAuth = { display: user.username === blog.user.username ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const queryClient = useQueryClient();

  const deleteBlogMutation = useMutation({
    mutationFn: blogservice.remove,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const addLikeMutation = useMutation({
    mutationFn: blogservice.update,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const deleteBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const addLike = (event) => {
    event.preventDefault();
    const newLikes = blog.likes + 1;
    const updatedBlog = { ...blog, likes: newLikes, user: blog.user.id, };

    addLikeMutation.mutate(updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        {blog.user ? <div>{blog.user.name}</div> : <div>Unknown</div>}
        <div style={showWhenAuth}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
