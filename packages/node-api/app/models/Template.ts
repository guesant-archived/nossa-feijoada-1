import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import User from './User';

const TemplateSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
    index: true,
  },
  name: { type: String, required: true, index: true, text: true },
  description: { type: String, index: true, text: true },
  template: { type: Object, required: true },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
});

export interface TemplateDoc extends mongoose.Document {
  author: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  template: any;
  createdAt: number;
}

TemplateSchema.plugin(mongoosePaginate);
const Template = mongoose.model<TemplateDoc>('Template', TemplateSchema);

export default Template;
