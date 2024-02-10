import { useState, useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useNotificationDispatch } from "./reducers/NotificationContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import userContext, { useUserValue, useUserDispatch } from "./reducers/UserContext";


const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sortedBlogs, setSortedBlogs] = useState([]);

  // useReducer + Context
  const [user, userDispatch] = useContext(userContext);
  const notificationDispatch = useNotificationDispatch();

  const { data: blogs, isSuccess, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  })

  const addBlogMutation = useMutation(
    { mutationFn: blogService.create,
      onSuccess: () => {
        refetch();
      }
    });

  useEffect (() => {
    if (blogs) {
      setSortedBlogs(blogs.sort((a, b) => b.likes - a.likes));
    }
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userNew = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SET_USER", payload: userNew });
      blogService.setToken(userNew.token);
    }
  }, [userDispatch]);

  const blogFormRef = useRef();

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    addBlogMutation.mutate(blogObject);
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `a new blog ${blogObject.title} by ${blogObject.author} added`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "SET_NOTIFICATION", payload: null });
    }, 5000);
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      userDispatch({ type: "SET_USER", payload: user });
      setUsername("");
      setPassword("");
    } catch (exception) {
      notificationDispatch({
        type: "SET_ERROR",
        payload: "wrong username or password",
      });
      setTimeout(() => {
        notificationDispatch({ type: "SET_ERROR", payload: null });
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    userDispatch({ type: "SET_USER", payload: null });
    setUsername("");
    setPassword("");
  };

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

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

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {logoutForm()}
      {blogForm()}
      {sortedBlogs?.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
