import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorNote from './components/ErrorNote'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) 
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    } 
    )  

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
      })
    
    setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const deleteBlog = (blogID) => [
    blogService
      .remove(blogID)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== blogID))
      })
  ]

  const addLike = (blogID, blogObject) => {
    blogService
      .update(blogID, blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.map(blog => blog.id !== blogID ? blog : returnedBlog).sort((a, b) => b.likes - a.likes))
      })
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
    </Togglable>     
  )
  

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
        <div>
          <p>{user.name} logged in
          <button type="submit">logout</button></p>
        </div>
      </form>
  )

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
  )

  if (user === null) {
    return (
      <div>        
        <h2>Log in to application</h2>
        <ErrorNote message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} />
      <ErrorNote message={errorMessage} />
      {logoutForm()}
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLike = {addLike} removeBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App