/**
 * @file Implements mongoose schema to represent stories.
 */
import mongoose, {Schema} from "mongoose";
import Story from "../../models/stories/story";


const StorySchema = new mongoose.Schema<Story>({
  image: {type: String, required: true},
  viewers: {type: [{type: Schema.Types.ObjectId, ref: "UserModel"}], default:[]},
  description: String,
  postedOn: {type: Date, default: Date.now},
  postedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true}
}, {collection: "stories"});

export default StorySchema;