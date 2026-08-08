import mongoose, { Schema, Document } from 'mongoose';

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  resumeUrl: string;
  answers: string[];
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema: Schema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    name: { type: String, required: true },
    phone: { 
      type: String, 
      required: true,
      validate: {
        validator: function(v: string) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid 10-digit phone number!`
      }
    },
    resumeUrl: { type: String, required: true },
    answers: [{ type: String }],
  },
  { timestamps: true }
);

if (mongoose.models.JobApplication) {
  delete mongoose.models.JobApplication;
}

const JobApplication = mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);

export default JobApplication;
