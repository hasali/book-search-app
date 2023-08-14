// script.test.js
//Work in progress.
const axios = require('axios');
jest.mock('axios');

const { performSearch } = require('./public/script.js');

test('performSearch handles API response with results', async () => {
  
  axios.get.mockResolvedValue({ data: [{
    title: 'War and Peace',
    isbn: '9780307477477',
    author_first_name: 'Leo',
    author_last_name: 'Tolstoy',
    genre: 'Historical Fiction'
    
  }] });

  const mockEvent = {
    preventDefault: jest.fn()
  };

  
  const searchInput = { value: 'War and Peace' };
  const bookList = { innerHTML: '' };
  const errorMessage = { textContent: '' };

  await performSearch(mockEvent, searchInput, bookList, errorMessage);


  expect(bookList.innerHTML).toContain('War and Peace');
  expect(bookList.innerHTML).toContain('9780307477477');
  expect(bookList.innerHTML).toContain('Leo Tolstoy');
  expect(bookList.innerHTML).toContain('Historical Fiction');
  expect(errorMessage.textContent).toBe('');
});
