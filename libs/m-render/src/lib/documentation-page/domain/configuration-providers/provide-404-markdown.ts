import { IDocumentationConfiguration } from '../i-documentation-configuration';

export function provide404Markdown(notFoundMarkdown: string): Partial<IDocumentationConfiguration> {
  return {
    notFoundMarkdown,
  };
}
