document.getElementById("input-form").addEventListener("submit", function(event) {
  	event.preventDefault()

    
    const cardContainer = document.getElementById('div-recommendations');

	  var bookName = document.getElementById("input-title").value
    var k = document.getElementById("input-recommendation-size").value
    getBookList().then(function(result) {
      bookTitles = result;
      bookidValue = bookTitles.indexOf(bookName)
      console.log("Book Id: " + bookidValue)
      getRecommendations(bookidValue, k)
    });
});

async function getRecommendations(book_id, k) {
  
  const cardContainer = document.getElementById('div-recommendations');
  const response = await (await fetch("recommend?book_id=" + book_id + "&k=" + k)).json()

  recommendations = response['recommendations']
  console.log(recommendations)

  cardContainer.replaceChildren();
  for (const book of recommendations) {
    const card = createCard(book['title'], book['author']);
    cardContainer.appendChild(card);
  }
}




// Function to create a card element
function createCard(title, author) {
    const card = document.createElement('div');
    card.className = "recommendation-result-card"
    card.classList.add('card');
    
    // const cardImage = document.createElement('img');
    // cardImage.src = image;
    // cardImage.alt = title;
    // card.appendChild(cardImage);
    
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    
    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title;
    cardContent.appendChild(cardTitle);
    
    const cardAuthor = document.createElement('p');
    cardAuthor.textContent = `Author: ${author}`;
    cardContent.appendChild(cardAuthor);
    
    // const cardSimilarity = document.createElement('p');
    // cardSimilarity.textContent = `Similarity: ${similarity*100}%`;
    // cardContent.appendChild(cardSimilarity);
    
    card.appendChild(cardContent);
    return card;
  }

  async function getBookList() {
    const response = await (await fetch("/get_csv_data")).json()
    return response['books']
  }

  




// async function getGoodreadsBook(link) {
//     try {
//         // Fetch the HTML content of the Goodreads book page
//         const response = await fetch(link);
//         const html = await response.text();
    
//         // Create a temporary element to parse the HTML content
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
    
//         // Extract the book details
//         const titleElement = doc.querySelector('.Text Text__title1');
//         const title = titleElement.textContent.trim();
    
//         const authorElement = doc.querySelector('ContributorLink__name')[0];
//         const author = authorElement.textContent.trim();
    
//         const imageElement = doc.querySelector('.BookCover img');
//         const imageUrl = imageElement.src;
    
//         // Return the book details
//         return {
//           title,
//           author,
//           imageUrl
//         };
//       } 
//       catch (error) {
//         console.error('Error:', error);
//         throw new Error('Failed to retrieve book details.');
//       }
// }
