import mongoose, { Schema, Document } from 'mongoose';

export interface IJobQuestion {
  question: string;
  type: 'yes_no' | 'text';
}

export interface IJob extends Document {
  title: string;
  type: string;
  branch: string;
  deadline: Date;
  openings: number;
  description: string;
  questions: IJobQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], required: true },
    branch: { type: String, required: true },
    deadline: { type: Date, required: true },
    openings: { type: Number, required: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.Mixed }], // Mixed to allow backward compatibility with string arrays
  },
  { timestamps: true }
);

if (mongoose.models.Job) {
  delete mongoose.models.Job;
}

const Job = mongoose.model<IJob>('Job', JobSchema);

export default Job;
