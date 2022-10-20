/**
 * @file Implements mongoose schema to represent follows.
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/follow";

const FollowSchema = new mongoose.Schema<Follow>({
    user: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    followedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
}, {collection: "follows"});

export default FollowSchema;