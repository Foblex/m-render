import container from 'markdown-it-container';
import { EMarkdownContainerType } from './domain';
import { IMarkdownItToken } from './domain';
import { EParsedContainerType, IParsedContainerData } from "./domain";

type ContainerArgs = [typeof container, string, { render: any }]
const F_CONTAINER_CLOSE_TAG = 'container_code-group_close';

export class ParseGroupedCodeItems {

  public render(): ContainerArgs {
    return [container, EMarkdownContainerType.CODE_GROUP, {
      render: (tokens: IMarkdownItToken[], index: number) => {
        if (this._isOpeningToken(tokens, index)) {

          return this._openingExampleGroupHTML(this._generateData(tokens, index));
        }
        return '</f-code-group>';
      },
    }];
  }

  private _isOpeningToken(tokens: IMarkdownItToken[], index: number): boolean {
    return tokens[index].nesting === 1;
  }

  private _generateData(tokens: IMarkdownItToken[], index: number): IParsedContainerData[] {
    const result: IParsedContainerData[] = [];

    for (let i = index + 1; !this._isClosingToken(tokens, i); i++) {
      if (this._isCodeFenceToken(tokens[i])) {
        result.push({
          tab: this._getCodeBlockTitle(tokens[i].info),
          value: tokens[i].content,
          type: EParsedContainerType.CODE,
          isLink: false,
          height: 'auto',
          language: this._getCodeLanguage(tokens[i].info),
        });
      }
    }

    return result;
  }

  private _isClosingToken(token: IMarkdownItToken[], index: number): boolean {
    return token[index].nesting === -1 && token[index].type === F_CONTAINER_CLOSE_TAG;
  }

  private _isCodeFenceToken(token: IMarkdownItToken): boolean {
    return token.type === 'fence' && token.tag === 'code';
  }

  private _openingExampleGroupHTML(data: IParsedContainerData[]): string {
    const jsonData = JSON.stringify(data).replace(/"/g, '&quot;');
    return `<f-code-group data-data="${jsonData}">`;
  }

  private _getCodeBlockTitle(data: string): string {
    return data.match(/\[(.*)\]/)?.[1] || this._getCodeLanguage(data) || 'txt';
  }

  private _getCodeLanguage(data: string): string {
    const match = data.trim().match(/^([a-zA-Z0-9_-]+)\s*\[.*\]$/);
    return match ? match[1] : '';
  }
}
