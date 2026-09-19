import mongoose, { Schema, Document } from 'mongoose';

export interface IFaq {
  question: string;
  answer: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: any; // Tiptap JSON
  excerpt: string; // For SEO and listing
  coverImage: string;
  coverImageAlt: string;
  cloudinaryId: string;
  author: string;
  authorCredentials?: string;
  authorSpecialty?: string;
  tags: string[];
  faqs?: IFaq[];
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
    coverImageAlt: { type: String, default: '' },
    cloudinaryId: { type: String, required: true },
    author: { type: String, default: 'Singh Dental Care' },
    authorCredentials: { type: String, default: '' },
    authorSpecialty: { type: String, default: '' },
    tags: [{ type: String }],
    faqs: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
