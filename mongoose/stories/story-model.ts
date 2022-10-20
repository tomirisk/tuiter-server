/**
 * @file Implements mongoose model to CRUD documents in the stories collection.
 */
import mongoose from "mongoose";
import StorySchema from "./story-schema";
const StoryModel = mongoose.model("StoryModel", StorySchema);
export default StoryModel;