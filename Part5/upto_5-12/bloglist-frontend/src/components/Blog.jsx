import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLike, removeBlog }) => {
  
  const [visible, setVisible] = useState(false)
  const [userAuth, setUserAuth] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const showWhenAuth = { display: userAuth ? 'none' : '' }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const user = JSON.parse(loggedUserJSON)
    if (user) {
      if (user.username === blog.user.username) {
        setUserAuth(false)
      } else {
        setUserAuth(true)
      }
    }
  })
  
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  const addLike = (event) => {
    event.preventDefault()
    const newLikes = blog.likes + 1
    updateLike(blog.id, {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes
    })
    setLikes(newLikes)

  }

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
          <div>{blog.likes}<button onClick={addLike}>like</button></div>
          {blog.user ? <div>{blog.user.name}</div> : <div>Unknown</div>}
          <div style={showWhenAuth}>
            <button onClick={deleteBlog}>remove</button>
            </div>
        </div>
  </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog