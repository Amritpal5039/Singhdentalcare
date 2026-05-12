import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: any; // Tiptap JSON
  excerpt: string; // For SEO and listing
  coverImage: string;
  cloudinaryId: string;
  author: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: Schema.Types.Mixed, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    author: { type: String, default: 'Singh Dental Care' },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
