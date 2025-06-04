import { Router } from "express";
import { errorCatcher } from "../../utils/catchError.js";
import validate from "../../middleware/validate.middleware.js";
import {
  getAllBooks,
  addBook,
  updateBook,
  getBookById,
  borrowBookById,
  borrowBookByISBN,
} from "./book.controller.js";
import auth from "../../middleware/auth.middleware.js";
import { bookSchema, bookUpdateSchema } from "./book.valid.js";

const router = Router();

router.get("/", errorCatcher(getAllBooks));
router.get("/:id", errorCatcher(getBookById));
router.delete("/", auth(), errorCatcher(borrowBookByISBN));
router.delete("/:id", auth(), errorCatcher(borrowBookById));
router.post("/addBook", auth(), validate(bookSchema), errorCatcher(addBook));
router.post(
  "/updateBook/:id",
  auth(),
  validate(bookUpdateSchema),
  errorCatcher(updateBook)
);

export default router;
