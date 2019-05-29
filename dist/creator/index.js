"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
require('source-map-support').install();
const fse = require("fs-extra");
const path = require("path");
const component_1 = require("../templates/component");
const style_1 = require("../templates/style");
const test_1 = require("../templates/test");
const usage_1 = require("../templates/usage");
exports.COMPONENTS_PATH = 'src/components';
function create({ componentName, isShadow = false, styleExtension = 'none', createTestFile = true, currentDir = process.cwd() }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentGeneralName = utils_1.convertComponentNameToComponentGeneralName(componentName);
        const componentsPath = path.join(currentDir, exports.COMPONENTS_PATH);
        const componentPath = path.resolve(componentsPath, componentGeneralName);
        const testPath = path.resolve(componentPath, 'test');
        const usagePath = path.resolve(componentPath, 'usage');
        const directoryExists = yield componentDirectoryExists(componentPath);
        if (directoryExists) {
            throw new Error(`A directory already exists for the component ${componentName}`);
        }
        yield createFolder(componentPath);
        yield createFolder(testPath);
        yield createFolder(usagePath);
        yield createComponent({ componentName, componentGeneralName, componentPath, isShadow, styleExtension });
        yield createUsage({ componentName, componentPath: usagePath });
        if (styleExtension !== 'none') {
            yield createComponentStyleFile({ componentName, componentGeneralName, componentPath, isShadow, styleExtension });
        }
        if (createTestFile) {
            yield createComponentTestFile({ componentName, componentGeneralName, componentPath: testPath });
            yield createComponentTestE2EFile({ componentName, componentGeneralName, componentPath: testPath });
        }
    });
}
exports.create = create;
function componentDirectoryExists(componentName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fse.pathExists(componentName);
    });
}
function createFolder(componentPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fse.ensureDir(componentPath);
    });
}
function createComponentFileName(componentName, extension = 'tsx') {
    return `${componentName}.${extension}`;
}
function createComponentTSFileName(componentName, extension = 'ts') {
    return `${componentName}.${extension}`;
}
function createComponent({ componentName, componentGeneralName, componentPath, isShadow, styleExtension, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentContent = component_1.createComponentContent({
            componentName,
            componentGeneralName,
            isShadow,
            styleExtension
        });
        return yield fse.writeFile(path.resolve(componentPath, createComponentFileName(componentGeneralName)), componentContent);
    });
}
function createUsage({ componentName, componentPath, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentContent = usage_1.createUsageContent({
            componentName
        });
        return yield fse.writeFile(path.resolve(componentPath, `general.md`), componentContent);
    });
}
function createComponentStyleFile({ componentName, componentGeneralName, componentPath, isShadow, styleExtension }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentStyleContent = style_1.createStyleContent({
            componentName,
            componentGeneralName,
            isShadow
        });
        return yield fse.writeFile(path.resolve(componentPath, createComponentFileName(componentGeneralName, styleExtension)), componentStyleContent);
    });
}
function createComponentTestFile({ componentName, componentGeneralName, componentPath, testPattern = 'spec' }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentTestContent = test_1.createComponentTestContent({
            componentName
        });
        const testFileName = `${componentGeneralName}.${testPattern}`;
        return yield fse.writeFile(path.resolve(componentPath, createComponentTSFileName(testFileName)), componentTestContent);
    });
}
function createComponentTestE2EFile({ componentName, componentGeneralName, componentPath, testPattern = 'e2e' }) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentTestContent = test_1.createComponentTestE2EContent({
            componentName
        });
        const testFileName = `${componentGeneralName}.${testPattern}`;
        return yield fse.writeFile(path.resolve(componentPath, createComponentTSFileName(testFileName)), componentTestContent);
    });
}
//# sourceMappingURL=index.js.map