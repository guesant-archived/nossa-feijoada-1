import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import User from './User';

const SourceSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  name: { type: String, required: true, index: true, text: true },
  description: { type: String, index: true, text: true },
  data: { type: Object, required: true },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
});
SourceSchema.plugin(mongoosePaginate);

export interface SourceDoc extends mongoose.Document {
  author: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  data: string;
  createdAt: number;
}
const Source = mongoose.model<SourceDoc>('Source', SourceSchema);

export default Source;
