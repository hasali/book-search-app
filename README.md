# UoT_SkillTest
## **Part 1**
- Used Neondb, a servless postgres database and the .env file is included.

<br>
## **Part 2**

1. Find the oldest book for each author.
<code>
SELECT
  "AUTHOR FIRST NAME",
  "AUTHOR LAST NAME",
  "TITLE",
  "PUBLISHED DATE"
FROM
  your_table
WHERE
  ("AUTHOR FIRST NAME", "AUTHOR LAST NAME", "PUBLISHED DATE") IN (
    SELECT
      "AUTHOR FIRST NAME",
      "AUTHOR LAST NAME",
      MIN("PUBLISHED DATE")
    FROM
      your_table
    GROUP BY
      "AUTHOR FIRST NAME",
      "AUTHOR LAST NAME"
  );
</code>
2. Find the authors who have written the most books in each genre.
<code>
WITH ranked_authors AS (
  SELECT
    author_first_name,
    author_last_name,
    genre,
    COUNT(*) AS book_count,
    ROW_NUMBER() OVER (PARTITION BY genre ORDER BY COUNT(*) DESC) AS rn
  FROM
    your_table
  GROUP BY
    author_first_name,
    author_last_name,
    genre
)
SELECT
  author_first_name,
  author_last_name,
  genre,
  book_count
FROM
  ranked_authors
WHERE
  rn = 1;
</code>
<br>
3. Calculate the total number of books published each year and display the results by year.
<code>
SELECT
  EXTRACT(YEAR FROM published_date) AS publication_year,
  COUNT(*) AS total_books_published
FROM
  your_table
GROUP BY
  publication_year
ORDER BY
  publication_year;
</code>
<br>
## **Part 3**
- The web app was built with express as backend and vanilla JS for the front.
- Dependencies: express, pg, and axios.
- run with npm server.js