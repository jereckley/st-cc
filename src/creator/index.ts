import {convertComponentNameToComponentGeneralName} from '../utils'

require('source-map-support').install()
import * as fse from 'fs-extra'
import * as path from 'path'
import {TypeAnswers} from '../questions'
import {createComponentContent} from '../templates/component'
import {createStyleContent} from '../templates/style'
import {createComponentTestContent, createComponentTestE2EContent} from '../templates/test'
import {styleExtension} from '../types'
import {createUsageContent} from '../templates/usage'

export const COMPONENTS_PATH = 'src/components'

export async function create({
                                 componentName,
                                 isShadow = false,
                                 styleExtension = 'none',
                                 createTestFile = true,
                                 currentDir = process.cwd()
                             }: TypeAnswers) {
    const componentGeneralName = convertComponentNameToComponentGeneralName(componentName)
    const componentsPath = path.join(currentDir, COMPONENTS_PATH)
    const componentPath = path.resolve(componentsPath, componentGeneralName)
    const testPath = path.resolve(componentPath, 'test')
    const usagePath = path.resolve(componentPath, 'usage')
    const directoryExists = await componentDirectoryExists(componentPath)
    if (directoryExists) {
        throw new Error(
            `A directory already exists for the component ${componentName}`
        )
    }

    await createFolder(componentPath)
    await createFolder(testPath)
    await createFolder(usagePath)

    await createComponent({componentName, componentGeneralName, componentPath, isShadow, styleExtension})

    await createUsage({componentName, componentPath: usagePath})

    if (styleExtension !== 'none') {
        await createComponentStyleFile({componentName, componentGeneralName, componentPath, isShadow, styleExtension})
    }

    if (createTestFile) {
        await createComponentTestFile({componentName, componentGeneralName, componentPath: testPath})
        await createComponentTestE2EFile({componentName, componentGeneralName, componentPath: testPath})
    }

}

async function componentDirectoryExists(componentName: string) {
    return await fse.pathExists(componentName)
}

async function createFolder(componentPath: string) {
    return await fse.ensureDir(componentPath)
}

function createComponentFileName(
    componentName: string,
    extension: string = 'tsx'
) {
    return `${componentName}.${extension}`
}

function createComponentTSFileName(
    componentName: string,
    extension: string = 'ts'
) {
    return `${componentName}.${extension}`
}

async function createComponent(
    {
        componentName,
        componentGeneralName,
        componentPath,
        isShadow,
        styleExtension,
    }: {
        componentName: string;
        componentGeneralName: string
        componentPath: string;
        isShadow: boolean;
        styleExtension: styleExtension
    }) {
    const componentContent = createComponentContent({
        componentName,
        componentGeneralName,
        isShadow,
        styleExtension
    })

    return await fse.writeFile(
        path.resolve(componentPath, createComponentFileName(componentGeneralName)),
        componentContent
    )
}

async function createUsage(
    {
        componentName,
        componentPath,
    }: {
        componentName: string;
        componentPath: string;
    }) {
    const componentContent = createUsageContent({
        componentName
    })

    return await fse.writeFile(
        path.resolve(componentPath, `general.md`),
        componentContent
    )
}

async function createComponentStyleFile(
    {
        componentName,
        componentGeneralName,
        componentPath,
        isShadow,
        styleExtension
    }: {
        componentName: string;
        componentGeneralName: string;
        componentPath: string;
        isShadow: boolean;
        styleExtension: string;
    }) {
    const componentStyleContent = createStyleContent({
        componentName,
        componentGeneralName,
        isShadow
    })

    return await fse.writeFile(
        path.resolve(
            componentPath,
            createComponentFileName(componentGeneralName, styleExtension)
        ),
        componentStyleContent
    )
}

async function createComponentTestFile(
    {
        componentName,
        componentGeneralName,
        componentPath,
        testPattern = 'spec'
    }: {
        componentName: string;
        componentGeneralName: string;
        componentPath: string;
        testPattern?: string;
    }) {
    const componentTestContent = createComponentTestContent({
        componentName
    })

    const testFileName = `${componentGeneralName}.${testPattern}`
    return await fse.writeFile(
        path.resolve(componentPath, createComponentTSFileName(testFileName)),
        componentTestContent
    )
}

async function createComponentTestE2EFile(
    {
        componentName,
        componentGeneralName,
        componentPath,
        testPattern = 'e2e'
    }: {
        componentName: string;
        componentGeneralName: string;
        componentPath: string;
        testPattern?: string;
    }) {
    const componentTestContent = createComponentTestE2EContent({
        componentName
    })

    const testFileName = `${componentGeneralName}.${testPattern}`
    return await fse.writeFile(
        path.resolve(componentPath, createComponentTSFileName(testFileName)),
        componentTestContent
    )
}
