import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [popupMessage, setPopupMessage] = useState({
    message: null,
    type: 'success',
  })
  const blogFormRef = useRef()

  // I had a go at writing using an async function inside the useEffect hook reference : https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [])

  // this was used to debug the logged in user issue
  // useEffect(() => {
  // 	console.log("current user:", user);
  // }, [user]);

  const popUp = (message, type = 'success') => {
    setPopupMessage({ message, type })
    setTimeout(() => {
      setPopupMessage({ message: null })
    }, 4000)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      // the important bit to allocate the token to the user
      blogService.setToken(user.token)
    } catch (exception) {
      console.log('Wrong credentials')
      popUp('wrong username or password', 'error')
    }
  }

  // check if there is a user is logged on and saved in localstorage

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(newBlog))

      popUp(
        `a new blog ${blogObject.title} by ${blogObject.author} was added by ${user.name}`
      )
    } catch (error) {
      console.log(error)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      setBlogs(blogs.filter((b) => b.id !== id))
      await blogService.deleteBlog(id)
    } catch (error) {
      console.log(error)
    }
  }

  const likesSortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification popupMessage={popupMessage} />
      {user && (
        <p>
          {user.name} is logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      )}
      {user === null ? loginForm() : blogForm()}

      <div>
        {likesSortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={updateBlog}
            removeBlog={deleteBlog}
            user={user || null}
          />
        ))}
      </div>
    </div>
  )
}

export default App
