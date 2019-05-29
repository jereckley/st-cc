"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function createComponentContent({ componentName, componentGeneralName, styleExtension = 'none', isShadow = false }) {
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
export class ${utils_1.convertComponentNameToComponentClassName(componentName)} {
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
exports.createComponentContent = createComponentContent;
//# sourceMappingURL=component.js.map