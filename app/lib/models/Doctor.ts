import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  credentials: string;
  specialty: string;
  experience: string;
  image: string;
  cloudinaryId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    credentials: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: String },
    image: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Force clear cache for dev
if (mongoose.models.Doctor) {
  delete mongoose.models.Doctor;
}

const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;
