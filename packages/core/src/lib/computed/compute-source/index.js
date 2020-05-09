export const computeSlotValues = (obj) => {
  return {
    left: obj.get('left'),
    top: obj.get('top'),
    width: obj.getScaledWidth(),
    height: obj.getScaledHeight(),
    angle: obj.get('angle'),
  };
};

export const computeTextValues = (obj) => {
  return {
    textAlign: obj.get('textAlign'),
    fontWeight: obj.get('fontWeight'),
    fontFamily: obj.get('fontFamily'),
  };
};

export const compute = (type, obj) => {
  const supportedTypes = { text: computeTextValues, slot: computeSlotValues };

  const handler = supportedTypes[type];
  if (!handler) {
    console.warn(`Compute type not supported: ${type}`);
    return;
  }
  return handler(obj);
};

export const toComputeSource = (source) => {
  const computedSource = { ...source };
  computedSource.computedValues = compute(source.type, source.data);
  return computedSource;
};
