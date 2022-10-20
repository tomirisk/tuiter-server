import mongoose from "mongoose";
import GroupSchema from "./group-schema";

const GroupModel = mongoose.model("GroupModel", GroupSchema);
export default GroupModel;