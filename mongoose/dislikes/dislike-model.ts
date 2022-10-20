/**
 * @file Implements mongoose model to CRUD documents in the dislikes collection
 */
import mongoose from "mongoose";
import DislikeSchema from "./dislike-schema";
const DislikeModel = mongoose.model("DislikeModel", DislikeSchema);
export default DislikeModel;
