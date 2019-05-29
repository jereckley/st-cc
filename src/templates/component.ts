import { convertComponentNameToComponentClassName } from '../utils';
import { styleExtension } from '../types';

type CreateComponentArgs = {
  componentName: string;
  componentGeneralName: string;
  styleExtension?: styleExtension;
  isShadow?: boolean;
};

export function createComponentContent({
  componentName,
  componentGeneralName,
  styleExtension = 'none',
  isShadow = false
}: CreateComponentArgs) {
  const componentTags = [`tag: '${componentName}'`];
  if (styleExtension !== 'none') {
    componentTags.push(`styleUrl: '${componentGeneralName}.${styleExtension}'`);
  }

  if (isShadow) {
    componentTags.push(`shadow: true`);
  }

  return `import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  ${componentTags.join(`,\n  `)}
})
export class ${convertComponentNameToComponentClassName(componentName)} {
  @Prop() data: string

  render() {
    return (
      <Host>
        <div class="${componentGeneralName}">
          {this.data}
        </div>
      </Host>
    );
  }
}
`;
}
