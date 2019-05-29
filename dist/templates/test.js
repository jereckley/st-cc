"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function createComponentTestContent({ componentName }) {
    const componentClassName = utils_1.convertComponentNameToComponentClassName(componentName);
    const componentGeneralName = utils_1.convertComponentNameToComponentGeneralName(componentName);
    return `import { ${componentClassName} } from '../${componentGeneralName}';

describe('${componentName}', () => {
  
    let element: ${componentClassName}
    
    beforeEach(() => {
      element =  new ${componentClassName}()
    });
    
    it('should build', () => {
        expect(element).toBeTruthy()
    });
})
`;
}
exports.createComponentTestContent = createComponentTestContent;
function createComponentTestE2EContent({ componentName }) {
    const componentClassName = utils_1.convertComponentNameToComponentClassName(componentName);
    const componentGeneralName = utils_1.convertComponentNameToComponentGeneralName(componentName);
    return `import { newE2EPage } from '@stencil/core/dist/testing';

describe('${componentName}', () => {

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<${componentName}></${componentName}>');
    const element = await page.find('${componentName}');
    expect(element).toHaveClass('hydrated');
  });
});
`;
}
exports.createComponentTestE2EContent = createComponentTestE2EContent;
//# sourceMappingURL=test.js.map