import { EMarkdownContainerType, IMarkdownItToken } from './domain';

import container from 'markdown-it-container';
import { isOpeningToken } from './utils';

type ContainerArgs = [ typeof container, string, { render: any } ]

export class ParseShowcase {

  public render(): ContainerArgs {
    return [ container, EMarkdownContainerType.SHOWCASE, {
      render: (tokens: IMarkdownItToken[], index: number) => {
        if (isOpeningToken(tokens[index])) {
          return `<showcase></showcase>`;
        }
        return '';
      },
    } ];
  }
}
