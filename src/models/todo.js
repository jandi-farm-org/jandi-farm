import { Schema, model, models } from 'mongoose';

const TodoSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  due_date: { type: Date, required: true },
  detail: { type: String, required: true },
  tags: {
    type: [{ type: String, required: true }],
    required: function() { return this.tags != undefined }
  },
  project: { // One-to-Squillions 부모(프로젝트) 참조
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  done: {
    type: Boolean,
    default: false,
    required: function() { return this.done != undefined }
  },
  is_public: {
    type: Schema.Types.Boolean,
    default: false,
    required: function() { return this.is_public != undefined }
  }
});

// ensure model() is called once
const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;