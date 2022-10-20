/**
 * @file Declares Story data type representing relationship between user and story, as user creates
 * a story and relationship between users, as in user views another users' stories
 */
import User from "../users/user";
import mongoose from "mongoose";

/**
 * @typedef Story Story data type representing relationship between user and story
 * @property {String} image image of the story
 * @property {String} viewers identifies the users list who can view the story
 * @property {String} description description of the story
 * @property {Date} postedOn date on which the story was posted
 * @property {User} postedBy User who posted the story
 */
export default interface Story {
  _id?: mongoose.Schema.Types.ObjectId,
  image: string,
  viewers: User[],
  description?: String,
  postedOn: Date,
  postedBy: User
};