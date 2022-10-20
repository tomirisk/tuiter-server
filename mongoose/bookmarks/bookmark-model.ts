/**
 * @file Implements mongoose model to CRUD documents in the bookmarks collection
 */
import mongoose from "mongoose";
import BookmarkSchema from "./bookmark-schema";
const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);
export default BookmarkModel;