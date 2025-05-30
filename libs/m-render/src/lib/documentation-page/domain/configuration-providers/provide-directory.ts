import { IDocumentationConfiguration } from '../i-documentation-configuration';

export function provideDirectory(docsDir: string): Partial<IDocumentationConfiguration> {
  return {
    docsDir,
  };
}
