// library.router.js
import express from "express";
import initLibraryApp from "./initLibraryApp.js";

const libraryApp = express();
initLibraryApp(libraryApp, express);

export default libraryApp;
