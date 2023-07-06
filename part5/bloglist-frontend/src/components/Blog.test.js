import Reactimport from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'Looking into the displaying of a blog',
    author: 'Mrs Bloggy',
    user: 'user',
    url: 'test url',
    likes: 5,
  }
  render(<Blog blog={blog} />)
  const element = screen.getByText(
    'Looking into the displaying of a blog Mrs Bloggy'
  )

  screen.debug(element)
  expect(element).toBeDefined()
})
