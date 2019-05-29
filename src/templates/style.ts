type CreateStyleArgs = {
  componentName: string;
  componentGeneralName: string;
  isShadow?: boolean;
};

export function createStyleContent({
  componentName,
  componentGeneralName,
  isShadow = false
}: CreateStyleArgs) {
  return `${isShadow ? ':host' : componentName} {}
.${componentGeneralName} {}
  `;
}
