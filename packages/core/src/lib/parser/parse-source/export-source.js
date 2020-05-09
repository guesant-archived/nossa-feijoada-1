const ExportTemplateSource = (source) => {
  return {
    ...source,
    data: source.data.toJSON(),
  }
}

export default ExportTemplateSource