import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import User from '../User';

export const GallerySchemaDefinition: mongoose.SchemaDefinition = {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
    index: true,
  },
  name: { type: String, required: true, index: true, text: true },
  description: { type: String, index: true, text: true },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
};

export const getGallerySchema = (extra?: mongoose.SchemaDefinition) => {
  const schema = new mongoose.Schema(GallerySchemaDefinition);
  schema.plugin(mongoosePaginate);

  if (extra) {
    schema.add(extra);
  }
  return schema;
};

export interface GalleryDoc extends mongoose.Document {
  author: mongoose.Types.ObjectId;
  name: string;
  description: string;
  createdAt: number;
}
