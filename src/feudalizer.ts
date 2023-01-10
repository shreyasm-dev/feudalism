/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse, Options } from 'acorn';
import { generate } from 'escodegen';
import { walk } from 'estree-walker';

export const feudalize = (options: Options, dictionary: string[], code: string, variables: Record<string, string>, action: (name: string) => string, outputAst: boolean) => {
  const ast = parse(code, options);
  walk(ast, {
    enter: (node) => {
      if (node.type === 'Identifier') {
        if (node.name in variables) {
          node.name = variables[node.name];
        }
      } else if (node.type === 'VariableDeclarator') {
        if (node.id.type === 'Identifier') {
          variables[node.id.name] = action(node.id.name);
          node.id.name = variables[node.id.name];
        }
      }
    },
  });

  return outputAst ? JSON.stringify(ast, null, 2) : generate(ast);
};
