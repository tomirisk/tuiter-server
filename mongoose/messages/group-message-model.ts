import mongoose from "mongoose";
import GroupMessageSchema from "./group-message-schema";

const GroupMessageModel = mongoose.model("GroupMessageModel", GroupMessageSchema);
export default GroupMessageModel;