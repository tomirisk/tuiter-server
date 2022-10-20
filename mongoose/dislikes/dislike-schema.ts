/**
 * @file Implements mongoose schema to represent dislikes.
 */
import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/dislike";

const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel", required: true},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: "dislikes"});

export default DislikeSchema;
