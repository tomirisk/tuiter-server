/**
 * @file Implements mongoose schema to represent likes.
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/like";

const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel", required: true},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: "likes"});

export default LikeSchema;