/**
* @file Implements mongoose schema
* for the groupMessages collection
*/

import mongoose, {Schema} from "mongoose";
import GroupMessage from "../../models/messages/group-message";

const GroupMessageSchema = new mongoose.Schema<GroupMessage>({
    message: {type: String, required: true},
    sender: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    group: {type: Schema.Types.ObjectId, ref: "GroupModel", required: true},
    sentOn: {type: Date, default: Date.now},
    attachmentKey: {type: String}
}, {collection: "groupMessages"});
export default GroupMessageSchema;