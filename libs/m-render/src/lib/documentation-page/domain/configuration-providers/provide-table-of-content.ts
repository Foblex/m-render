import { ITableOfContent } from '../../components';
import { IDocumentationConfiguration } from '../i-documentation-configuration';

export function provideTableOfContent(tableOfContent: ITableOfContent | null = {
  title: 'In this article',
  range: { start: 2, end: 6 },
}): Partial<IDocumentationConfiguration> {
  return {
    tableOfContent,
  };
}
