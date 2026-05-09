import mongoose, { Schema, Document } from 'mongoose';

export interface IDisease extends Document {
  name: string;
  description: any; // Changed from string to any to support Tiptap JSON
  pictureLink: string;
  slug: string;
  startsWithLetter: string;
  createdAt: Date;
  updatedAt: Date;
}

const DiseaseSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: Schema.Types.Mixed, required: true }, // Changed to Mixed
    pictureLink: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    startsWithLetter: { type: String, required: true },
  },
  { timestamps: true }
);

// Delete the model if it exists to ensure schema updates are picked up in dev
if (mongoose.models.Disease) {
  delete mongoose.models.Disease;
}

const Disease = mongoose.model<IDisease>('Disease', DiseaseSchema);

export default Disease;
