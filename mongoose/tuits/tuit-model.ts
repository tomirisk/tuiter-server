/**
 * @file Implements mongoose model to CRUD documents in the tuits collection.
 */
import mongoose from "mongoose";
import TuitSchema from "./tuit-schema";
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;

