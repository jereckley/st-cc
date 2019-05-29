const COMPONENT_NAME_REGEX = /^(?!-)(?=.*-)([a-z-]+){2,}(?:[^-])$/g;

export function convertComponentNameToComponentClassName(
  componentName: string = ''
) {
  return componentName
    .split('-')
    .map((w, index) => {
      return index === 0 ? '' :w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join('');
}

export function convertComponentNameToComponentGeneralName(
    componentName: string = ''
) {
  return componentName
      .split('-')
      .map((w,index) => {
        return index === 0 ? '' : index === 1 ? w : "-" + w
      })
      .join('');
}

export function validateComponentName(name: string) {
  const SUCCESS = name.match(COMPONENT_NAME_REGEX) !== null;

  return {
    SUCCESS,
    errorMessage: SUCCESS
      ? undefined
      : 'Please enter a component name with at least one dash e.g. my-app'
  };
}
