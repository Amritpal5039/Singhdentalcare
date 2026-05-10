import mongoose from "mongoose";

const PodcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Podcast = mongoose.models.Podcast || mongoose.model("Podcast", PodcastSchema);
