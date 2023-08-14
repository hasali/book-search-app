const fs = require('fs');
const csvParser = require('csv-parser');
const { Pool } = require('pg');
require('dotenv').config();

const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getCSVData(){
  try{
    await pool.connect();
    console.log("Connected to db successfully");
    fs.createReadStream('books.csv')
      .pipe(csvParser())
      .on('data', async (data) => {
        let sql = "INSERT INTO books(isbn, title, author_first_name, author_last_name, genre, published_date)"+
                  "VALUES ($1, $2, $3, $4, $5, $6)";
        let values = [data['ISBN'], data['TITLE'], data['AUTHOR FIRST NAME'], data['AUTHOR LAST NAME'], data['GENRE'], data['PUBLISHED DATE']];
        
        try{
          await pool.query(sql, values);
        }catch(error){
          console.log("Error inserting: ", error);
        }
      })
      .on('end', () => {
        console.log('CSV import done!');
      });
  }catch(error) {
    console.error("DB Error: ", error);
  }
}

getCSVData();