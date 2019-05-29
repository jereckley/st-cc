"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createStyleContent({ componentName, componentGeneralName, isShadow = false }) {
    return `${isShadow ? ':host' : componentName} {}
  .${componentGeneralName} {}
  `;
}
exports.createStyleContent = createStyleContent;
//# sourceMappingURL=style.js.map