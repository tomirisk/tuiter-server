/**
 * @file Implements mongoose schema to CRUD to represent users.
 */
import mongoose from "mongoose";
import Location from "../../models/users/location";
import User from "../../models/users/user";
import AccountType from "../../models/users/account-type";
import MaritalStatus from "../../models/users/marital-status";
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: AccountType},
    maritalStatus: {type: String, enum: MaritalStatus},
    location: new mongoose.Schema<Location>({latitude: Number, longitude: Number}),
    salary: {type: Number, default: 50000}
}, {collection: 'users'});

export default UserSchema;
