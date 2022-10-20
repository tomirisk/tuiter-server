/**
 * @file Declares GroupMessage data type representing relationship between users, as in user messages a group
 */
import User from "../users/user";
import mongoose from "mongoose";
import Group from "./group";

/**
 * @typedef GroupMessage Represents messages relationship between two users, as in a user messages another user
 * @property {Group} group Group being messaged
 * @property {User} sender User messaging the group
 * @property {string} message the message
 * @property {Date} sentOn date on which the message was sent
 * @property {string} attachments
 */
export default interface GroupMessage {
    _id?: mongoose.Schema.Types.ObjectId,
    message: string,
    sender: User,
    group: Group,
    sentOn: Date,
    attachmentKey?: string
};