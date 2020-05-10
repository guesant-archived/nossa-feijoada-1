import { ImportTemplateSource } from '../parse-source';

const ImportTemplate = async (exportedTemplate) => {
  const { template, ...templateDoc } = exportedTemplate;

  template.sources = await Promise.all(
    (template.sources || []).map(async (source) => ({
      ...source,
      data: await ImportTemplateSource(source),
    })),
  );

  return {
    template,
    templateDoc,
  };
};

export default ImportTemplate;
