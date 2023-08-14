// server.test.js

const app = require('./server.js');

describe('GET /search',  () => {
  it('responds with JSON containing search results for "War and Peace"', async () => {
    const response =  await request(app).get('/search?q=War and Peace');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        title: 'WAR AND PEACE',
        isbn: '9780307477477',
        author_first_name: 'LEO',
        author_last_name: 'TOLSTOY',
        genre: 'HISTORICAL FICTION',
       
      }
    ]);
  });

});
