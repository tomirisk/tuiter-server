/**
 * @file Implements mongoose schema
 * for the messages collection
 */

import mongoose, { Schema } from "mongoose";
import Message from "../../models/messages/message";

const MessageSchema = new mongoose.Schema<Message>(
  {
    message: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    sentOn: { type: Date, default: Date.now },
    attachmentKey: { type: String },
    pinned: { type: Boolean, default: false },
  },
  { collection: "messages" }
);
export default MessageSchema;
