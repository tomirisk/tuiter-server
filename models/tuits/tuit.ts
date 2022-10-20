/**
 * @file Implements model to represent tuits.
 */
import User from "../users/user";
import Stats from "./stats";

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    stats: Stats
};