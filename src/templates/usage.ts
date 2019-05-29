type CreateUsageArgs = {
    componentName: string;
};

export function createUsageContent({
                                       componentName,
                                   }: CreateUsageArgs) {
    return `<!--default-->
  <${componentName}></${componentName}>
  `;
}
