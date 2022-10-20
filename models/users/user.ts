/**
 * @file Implements model to represent users.
 */
import AccountType from "./account-type";
import MaritalStatus from "./marital-status";
import Location from "./location";
import mongoose from "mongoose";

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};
