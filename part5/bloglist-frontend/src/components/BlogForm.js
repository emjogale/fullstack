import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: '',
  })

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title:
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={(event) =>
                setNewBlog({
                  ...newBlog,
                  [event.target.name]: event.target.value,
                })
              }
              id="title-input"
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              name="author"
              type="text"
              value={newBlog.author}
              onChange={(event) =>
                setNewBlog({
                  ...newBlog,
                  [event.target.name]: event.target.value,
                })
              }
              id="author-input"
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              name="url"
              value={newBlog.url}
              onChange={(event) =>
                setNewBlog({
                  ...newBlog,
                  [event.target.name]: event.target.value,
                })
              }
              id="url-input"
            />
          </label>
        </div>
        <button id="create" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
