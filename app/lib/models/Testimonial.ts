import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  title: { type: String, required: false },
  videoUrl: { type: String, required: true }, // Can be full YouTube URL or Shorts URL
  videoId: { type: String, required: true }, // Extracted ID for embedding
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
