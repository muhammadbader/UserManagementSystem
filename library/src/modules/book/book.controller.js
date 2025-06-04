import AppError from "../../utils/appError.js";
import BookModel from "../../../db/model/book.model.js";

export const addBook = async (req, res, next) => {
  console.log("Adding a book ");
  const { title, author, isbn } = req.body;
  if (!title || !author) {
    return next(new AppError("Title and author are required", 400));
  }

  // Simulate adding a book to the database
  await BookModel.findOne({ where: { isbn } })
    .then((existingBook) => {
      if (existingBook) {
        return next(new AppError("Book with this ISBN already exists", 409));
      }
    })
    .catch((error) => {
      console.error("Error checking for existing book:", error);
      return next(new AppError("Database error while checking book", 500));
    });

  // add the book to the database
  const newBook = await BookModel.create({
    title,
    author,
    isbn,
  });

  console.log("Book added successfully:", newBook);
  return res.status(201).json({
    message: "Book added successfully",
    book: newBook,
  });
};

export const updateBook = async (req, res, next) => {
  console.log("Updating a book");
  const { id } = req.params;
  const { title, author, isbn } = req.body;

  // Find the book by ID
  const book = await BookModel.findByPk(id);
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  const isbn_exists = await BookModel.findOne({ where: { isbn } });
  if (isbn_exists) {
    return next(new AppError("Book with this ISBN already exists", 409));
  }

  // Update the book details
  if (title) {
    book.title = title;
  }
  if (author) {
    book.author = author;
  }
  if (isbn) {
    book.isbn = isbn;
  }

  await book.save();

  console.log("Book updated successfully:", book);
  return res.status(200).json({
    message: "Book updated successfully",
    book,
  });
};

export const getAllBooks = async (req, res, next) => {
  console.log("Fetching all books");
  try {
    const books = await BookModel.findAll();
    if (books.length === 0) {
      return res.status(404).json({
        message: "No books found",
        books: [],
      });
    }
    console.log("Books fetched successfully:", books);
    return res.status(200).json({
      message: "Books fetched successfully",
      books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return next(new AppError("Database error while fetching books", 500));
  }
};

export const getBookById = async (req, res, next) => {
  console.log("Fetching book by ID");
  const { id } = req.params;

  // Find the book by ID
  const book = await BookModel.findByPk(id);
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  console.log("Book fetched successfully:", book);
  return res.status(200).json({
    message: "Book fetched successfully",
    book,
  });
};

export const borrowBookByISBN = async (req, res, next) => {
  console.log("Borrowing book by ISBN");
  const { isbn } = req.body;

  // Find the book by ISBN
  const book = await BookModel.findOne({ where: { isbn } });
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  // Simulate borrowing the book (e.g., updating status)
  await book.destroy();

  console.log("Book borrowed successfully:", book);
  return res.status(200).json({
    message: "Book borrowed successfully",
    book,
  });
};

export const borrowBookById = async (req, res, next) => {
  console.log("Borrowing book by ID");
  const { id } = req.params;

  // Find the book by ID
  const book = await BookModel.findByPk(id);
  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  // Simulate borrowing the book (e.g., updating status)
  await book.destroy();

  console.log("Book borrowed successfully:", book);
  return res.status(200).json({
    message: "Book borrowed successfully",
    book,
  });
};
