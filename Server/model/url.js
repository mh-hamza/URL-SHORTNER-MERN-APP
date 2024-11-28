import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  customUrl: {
    type: String,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  redirectCount: {
    type: Number,
    default: 0,
  },
  deviceType: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 },
  },
  accessLogs: [
    {
      ip: { type: String },
      location: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const URL = mongoose.model("URL", urlSchema);
export default URL;
