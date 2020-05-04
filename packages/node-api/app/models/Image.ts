import mongoose from 'mongoose';
import User from './User';

const PublicImageSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  files: {},
  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
});

export interface PublicImageDoc extends mongoose.Document {
  author: mongoose.Types.ObjectId;
  files: string[];
  createdAt: number;
}
const PublicImage = mongoose.model<PublicImageDoc>('PublicImage', PublicImageSchema);

export default PublicImage;
