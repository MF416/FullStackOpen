import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const user = useSelector((state) => state.user);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const showWhenAuth = { display: user.username === blog.user.username ? "" : "none" };

  const dispatch = useDispatch();

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

  const removeBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  const addLike = (event) => {
    event.preventDefault();
    const newLikes = blog.likes + 1;
    dispatch(likeBlog(blog.id, {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
    }));
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
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
