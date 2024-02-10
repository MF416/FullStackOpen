import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Users from "./components/Users";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import UserProfile from "./components/UserProfile";

import {
  Routes,
  Route,
  useMatch,
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { setNotification, setError } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducer";



const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.userList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const blogFormRef = useRef();

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
    dispatch(setNotification(
      `a new blog ${blogObject.title} by ${blogObject.author} added`,
    ));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser( username, password ));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("catch app.jsx")
      dispatch(setError("wrong username or password"));
      setUsername("");
      setPassword("");
      setTimeout(() => {
        dispatch(setError(null));
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    setUsername("");
    setPassword("");
  };

  // const match = useMatch("/users/:id");
  // const userMatch = match ? users.find((user) => user.id === String(match.params.id)) : null;

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <div>
        <p>
          {user.name} logged in
          <button type="submit">logout</button>
        </p>
      </div>
    </form>
  );

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {logoutForm()}
      <Routes>
        <Route path="/" element={
        <div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
            </div>
        } />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserProfile users={users} />} />
      </Routes>
      
    </div>
  );
};

export default App;
