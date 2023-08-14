const express = require('express');

const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
  
    try {
      await pool.connect();
      const result = await pool.query(
        'SELECT * FROM books WHERE lower(title) ILIKE $1 OR lower(author_first_name) ILIKE $1 OR lower(author_last_name) ILIKE $1 OR lower(isbn) ILIKE $1',
        [`%${searchQuery.toLowerCase()}%`]
      );
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error Getting the book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });