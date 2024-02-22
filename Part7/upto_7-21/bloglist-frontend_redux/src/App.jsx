import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Users from "./components/Users";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogPage from "./components/BlogPage";
import Togglable from "./components/Togglable";
import UserProfile from "./components/UserProfile";

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { setNotification, setError } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer';



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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser( username, password ));
      setUsername("");
      setPassword("");
    } catch (error) {
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


  const navBar = () => (
    <nav className="bg-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex space-x-4">
            <Link className="text-gray-300 hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              to="/">blogs</Link>
            <Link className="text-gray-300 hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              to="/users">users</Link>
            <span
              className="text-gray-500 py-2 text-sm font-medium"
            ><i>{user.name} logged in</i></span>
            <div className="py-1">
              <button
                className="rounded border border-indigo-600 bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                onClick={handleLogout}>logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const loginForm = () => (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">BlogList (TM) application</h1>
        <Notification />
        <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handleLogin}>
          <p className="text-center text-lg font-medium">Sign in to your account</p>
          <div>
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter username"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >login</button>
        </form>
      </div>
    </div>
  );

  const navStyle = {
    backgroundColor: '#f3f3f3',
    borderBottom: '1px solid #e7e7e7',
    padding: '2px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  };

  const padding = {
    padding: 5,
  };

  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      {navBar()}
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Blog App</h1>
        <Notification />
        <Routes>
          <Route path="/" element={

            <div className="mt-8">
              <div className="m-4">
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} />
                </Togglable>
              </div>
              <ul className="space-y-4">
                {blogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                  />
                ))}
              </ul>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserProfile users={users} />} />
          <Route path="/blogs/:id" element={<BlogPage blogs={blogs} />} />
        </Routes>
      </div>
      
    </div>
  );
};

export default App;
