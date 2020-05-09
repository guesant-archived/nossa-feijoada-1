import { ExportTemplateSource } from '../parse-source';

const ExportTemplate = (
  _template,
  _templateDoc = { name: '', description: '' },
) => {
  const { sources, ...template } = _template;

  template.sources = sources.map((source) => ExportTemplateSource(source));

  const templateDoc = { ..._templateDoc, template };
  return templateDoc;
};

export default ExportTemplate;
