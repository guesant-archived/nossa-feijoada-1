import mongoose from 'mongoose';
import { getGallerySchema, GalleryDoc } from './Generic/Gallery';

const TemplateSchema = getGallerySchema({
  template: { type: Object, required: true },
});

export interface TemplateDoc extends GalleryDoc {
  template: any;
}

const Template = mongoose.model<TemplateDoc>('Template', TemplateSchema);

export default Template;
