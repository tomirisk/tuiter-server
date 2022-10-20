/**
 * @file Implements mongoose schema to represent tuits.
 */
import mongoose from "mongoose";
import Tuit from "../../models/tuits/tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true},
    postedOn: {type: Date, default: Date.now},
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    }
}, {collection: 'tuits'});

export default TuitSchema;
