/**
 * @file Implements mongoose schema
 * for the groups collection
 */

import mongoose, {Schema} from "mongoose";
import Group from "../../models/messages/group";

const GroupSchema = new mongoose.Schema<Group>({
    name: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    users: [{type: Schema.Types.ObjectId, ref: 'UserModel'}],
    createdOn: {type: Date, default: Date.now},
}, {collection: "groups"});
export default GroupSchema;