

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const bookList = document.getElementById('bookList');
  
    const performSearch =  async () => {
      const searchQuery = searchInput.value.trim(); 

      if (searchQuery === '') {
        
        errorMessage.textContent = 'Please enter a book Title, ISBN, or Author First/Last name.';
        bookList.innerHTML = ''; // Clear previous search results
        return;
      }
      try {
        
        const response = await axios.get(`/search?q=${searchQuery}`);
        const books = response.data;
    
        bookList.innerHTML = '';
        errorMessage.textContent = '';

        if (books.length === 0) {
          // Display error message if no results are found
          errorMessage.textContent = 'No results found.';
        } else {
            books.forEach(async book => {
                const openLibraryResponse = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${book.isbn}&format=json&jscmd=data`);
                console.log(openLibraryResponse);
                // Get the cover image URL from the Open Library response
                const coverImageURL = openLibraryResponse.data[`ISBN:${book.isbn}`]?.cover?.medium;

                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.innerHTML = `<br>
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author_first_name} ${book.author_last_name}</p>
                    <p>Genre: ${book.genre}</p>
                    <p>Published Date: ${book.published_date}</p>
                    <p>ISBN: ${book.isbn}</p>
                    <img src="${coverImageURL}" alt="Book Cover">
                `;
                bookList.appendChild(bookCard);
            });
        }
      } catch (error) {
        console.error('Error bad request maybe?:', error);
      }
    };
    searchButton.addEventListener('click', performSearch);
  });