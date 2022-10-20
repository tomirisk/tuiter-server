/**
 * @file Declares Follow data type representing relationship between users, as in user follows another user
 */
import User from "../users/user";

/**
 * @typedef Follow Represents follows relationship between two users, as in a user follows another user
 * @property {User} user User being followed
 * @property {User} followedBy User following the user
 */
export default interface Follow {
    user: User,
    followedBy: User
};