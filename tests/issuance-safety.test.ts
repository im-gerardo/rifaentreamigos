import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';
import { expect, it } from 'vitest';

it('conserva el emisor como marcador deshabilitado sin ejecutarlo ni importar BD', () => {
  const source = readFileSync(resolve('scripts/issue_tickets.ts'), 'utf8');
  const file = ts.createSourceFile('issue_tickets.ts', source, ts.ScriptTarget.Latest, true);

  // Inspección AST, NO import ni ejecución del script de emisión.
  expect(file.statements).toHaveLength(1);
  const statement = file.statements[0];
  expect(ts.isVariableStatement(statement)).toBe(true);
  if (!ts.isVariableStatement(statement)) throw new Error('El emisor dejó de ser inerte');
  expect(statement.declarationList.flags & ts.NodeFlags.Const).toBeTruthy();
  expect(statement.declarationList.declarations).toHaveLength(1);
  const declaration = statement.declarationList.declarations[0];
  expect(declaration.name.getText(file)).toBe('TICKET_ISSUANCE_ENABLED');
  expect(declaration.initializer?.kind).toBe(ts.SyntaxKind.FalseKeyword);
});
