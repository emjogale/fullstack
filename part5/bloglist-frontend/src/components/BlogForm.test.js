import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const { container } = render(<BlogForm createBlog={createBlog} />)
  const user = userEvent.setup()

  const title = container.querySelector('#title-input')
  const author = container.querySelector('#author-input')
  const url = container.querySelector('#url-input')
  const sendButton = screen.getByText('create')

  await user.type(title, 'testing blog')
  await user.type(author, 'testing author')
  await user.type(url, 'testing url')

  await user.click(sendButton)
  console
  expect(createBlog.mock.calls[0][0].title).toBe('testing blog')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})
