import mongoose from 'mongoose';
import { getGallerySchema, GalleryDoc } from './Generic/Gallery';

const SourceSchema = getGallerySchema({
  image: { type: String },
  imageTransparent: { type: String },
});

export interface SourceDoc extends GalleryDoc {
  image?: string;
  imageTransparent?: string;
}
const Source = mongoose.model<SourceDoc>('Source', SourceSchema);

export default Source;
