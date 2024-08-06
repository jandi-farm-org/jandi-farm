import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  is_public: {
    type: Boolean,
    default: false,
    required: function() { return this.is_public != undefined }
  }
});

ProjectSchema.index({ owner: 1, title: 1 }, { unique: true })

// ensure model() is called once
const Project = models.Project || model("Project", ProjectSchema);

export default Project;