import { Schema } from "mongoose";
import { regenDb } from "../db/connection";

//taskID: unique id of the task
//userID: Id of the user that this task currently belongs to
//questID: Id of teh quest that this task belongs to
//createdAt: time and date the task was created
//name: name of the task
//description: description of the task
//requirements: list of requirements
//completionStatus: true if task is completed, false if task is not completed
//history: history of the task
const regenquestTaskSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "regenquestUser",
  },
  questID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "regenquestQuest",
  },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  description: String,
  requirements: [String],
  completionStatus: { type: Boolean, default: false },
  history: [String],
});

export default regenDb.model("regenquestTask", regenquestTaskSchema);
