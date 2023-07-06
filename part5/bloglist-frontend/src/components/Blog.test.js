import Reactimport from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  test('renders title and author but not url or likes by default', () => {
    const blog = {
      title: 'Looking into the displaying of a blog',
      author: 'Mrs Bloggy',
      user: 'user',
      url: 'test url',
      likes: 5,
    };
    render(<Blog blog={blog} />);
    const element = screen.getByText(
      'Looking into the displaying of a blog Mrs Bloggy'
    );
  });
  test('if like button is clicked twice then 2 more likes are added to the blog', async () => {
    const blog = {
      title: 'Really popular blog',
      author: 'Mr Bloggy',
      user: 'user',
      url: 'test url',
      likes: 75,
    };
    const mockHandler = jest.fn();
    render(<Blog blog={blog} addLike={mockHandler} />);
    const user = userEvent.setup();
    const button = screen.getByText('like');
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
