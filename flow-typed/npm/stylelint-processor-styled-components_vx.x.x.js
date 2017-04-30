// flow-typed signature: ad707f38f8f64c8d74f477bd6ef2d8bd
// flow-typed version: <<STUB>>/stylelint-processor-styled-components_v^0.1.0/flow_v0.45.0

import type BabelNode from 'babylon'

declare module 'stylelint-processor-styled-components/lib/utils/styled' {
  declare module.exports: {
    isHelper(node: BabelNode, importedNames: { [string]: string }): string,
    isStyled(node: BabelNode, styledVariableName: string): boolean,
    isStyledImport(node: BabelNode): boolean,
  }
}

declare module 'stylelint-processor-styled-components/lib/utils/parse' {
  declare module.exports: {
    parseImports(node: BabelNode, currentNames?: { [string]: string }): { [string]: string },
  }
}

declare module 'stylelint-processor-styled-components/lib/utils/general' {
  declare module.exports: {
    fixIndentation(
      str: string,
    ): {
      text: string,
    },
    wrapKeyframes(str: string): string,
    wrapSelector(str: string): string,
  }
}

declare module 'stylelint-processor-styled-components/lib/utils/tagged-template-literal' {
  declare module.exports: {
    getTaggedTemplateLiteralContent(node: BabelNode): string,
  }
}
