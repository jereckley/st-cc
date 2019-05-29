import {convertComponentNameToComponentClassName, convertComponentNameToComponentGeneralName} from '../utils'

type CreateComponentArgs = {
    componentName: string;
};

export function createComponentTestContent(
    {
        componentName
    }: CreateComponentArgs) {
    const componentClassName = convertComponentNameToComponentClassName(
        componentName
    )

    const componentGeneralName = convertComponentNameToComponentGeneralName(
        componentName
    )

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
`
}

export function createComponentTestE2EContent(
    {
        componentName
    }: CreateComponentArgs) {
    const componentClassName = convertComponentNameToComponentClassName(
        componentName
    )

    const componentGeneralName = convertComponentNameToComponentGeneralName(
        componentName
    )

    return `import { newE2EPage } from '@stencil/core/dist/testing';

describe('${componentName}', () => {

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<${componentName}></${componentName}>');
    const element = await page.find('${componentName}');
    expect(element).toHaveClass('hydrated');
  });
});
`
}
