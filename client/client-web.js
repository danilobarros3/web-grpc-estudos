const {
  AuthorsCLient,
  BookstoreClient,
} = require("../proto/bookstore_grpc_web_pb");
const { Empty } = require("google-protobuf/google/protobuf/empty_pb");
const port = 8080;
const bookstoreClient = new BookstoreClient("http://localhost:" + port);
const authorsClient = new AuthorsClient("http://localhost:" + port);

bookstoreClient.listBooks(new Empty(), {}, (err, response) => {
  if (err) return console.error(err);
  const books = response.getBooksList().map((book) => book.toObject());
  const list = document.createElement("ul");
  document.getElementById("books").appendChild(list);
  books.forEach((book) => {
    const li = document.createElement("li");
    li.innerText = `< a href="#" onclick="loadBook("${book.id}")" type="button">${book.title}</a>`;
    list.appendChild(li);
  });
});

document.loadBook = bookId => {
  bookstoreClient.getBook(new GetBookRequest().setBookid(bookId), {}, (err, response) => {
    if (err) return console.error(err);
    const book = response.toObject();
    const results = document.querySelector("#results>div")
    results.innerHTML = `<pre>${JSON.stringify(book, null, 2)}</pre>`
  })
}
