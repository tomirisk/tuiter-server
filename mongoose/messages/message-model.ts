import mongoose from "mongoose";
import MessageSchema from "./message-schema";

const MessageModel = mongoose.model("MessageModel", MessageSchema);
export default MessageModel;