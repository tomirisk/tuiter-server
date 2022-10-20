/**
 * @file Declares Group data type representing group of users
 */
import User from "../users/user";
import mongoose from "mongoose";

/**
 * @typedef Group Represents group of users
 * @property {User[]} users in the group
 * @property {Date} createdOn date on which the group was created
 */
export default interface Group {
    _id?: mongoose.Schema.Types.ObjectId,
    name: string,
    owner: User,
    users: User[],
    createdOn: Date
};