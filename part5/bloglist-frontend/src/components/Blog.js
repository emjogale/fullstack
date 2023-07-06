import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const showWhenVisible = {
    display: showDetails ? '' : 'none',
  }

  const handleClick = () => {
    addLike(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes += 1),
      user: blog.user,
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog? ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: 'lightcyan',
  }
  return (
    <div style={blogStyle}>
      <div className="title-author">
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={handleClick}>like</button>
        <br />
        {blog.user.name}
        <br />
        {user && user.name === blog.user.name ? (
          <button onClick={handleDelete}>delete</button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
