import mongoose, { Schema, Document } from 'mongoose';

export interface IMembershipPlan extends Document {
  image: string;
  cloudinaryId: string;
  buyNowLink: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const MembershipPlanSchema: Schema = new Schema(
  {
    image: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    buyNowLink: { type: String, default: 'https://pages.razorpay.com/stores/singhdentalcare' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export const MembershipPlan = mongoose.model<IMembershipPlan>('MembershipPlan', MembershipPlanSchema);
