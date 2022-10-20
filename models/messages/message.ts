/**
 * @file Declares Message data type representing relationship between users, as in user messages another user
 */
import User from "../users/user";
import mongoose from "mongoose";

/**
 * @typedef Message Represents messages relationship between two users, as in a user messages another user
 * @property {User} recipient User being messaged
 * @property {User} sender User messaging the user
 * @property {string} message the message
 * @property {Date} sentOn date on which the message was sent
 * @property {enum} attachments
 */
export default interface Message {
  _id?: mongoose.Schema.Types.ObjectId;
  message: string;
  sender: User;
  recipient: User;
  sentOn: Date;
  attachmentKey?: string;
  pinned: boolean;
}
