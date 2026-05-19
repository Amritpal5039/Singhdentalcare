import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroItem extends Document {
  type: 'image' | 'video';
  url: string;
  publicId: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HeroItemSchema: Schema = new Schema(
  {
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent model recompilation in development
if (mongoose.models.HeroItem) {
  delete mongoose.models.HeroItem;
}

const HeroItem = mongoose.model<IHeroItem>('HeroItem', HeroItemSchema);

export default HeroItem;
