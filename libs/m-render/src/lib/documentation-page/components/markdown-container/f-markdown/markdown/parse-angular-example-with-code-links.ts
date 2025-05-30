import { EMarkdownContainerType } from './domain';
import { IMarkdownItToken } from './domain';
import { getContent } from './utils';

import container from 'markdown-it-container';
import { EParsedContainerType, IMarkdownContainerData, IParsedContainerData } from "./domain";

type ContainerArgs = [typeof container, string, { render: any }];

export class ParseAngularExampleWithCodeLinks {

  public render(): ContainerArgs {
    return [container, EMarkdownContainerType.EXAMPLE_GROUP, {
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
    const component = this._parseNgComponent(tokens[index]);
    const height = component?.height || 'auto';
    if (component) {
      result.push(this._createComponentData(component));
    }
    const content = getContent(tokens, index, EMarkdownContainerType.EXAMPLE_GROUP);
    if (content) {
      this._parseData(content).forEach((x) => result.push(this._createContentData(x, height)));
    }

    return result;
  }

  private _createComponentData(component: { tag: string, height?: string }): IParsedContainerData {
    return {
      tab: 'Example',
      value: component.tag,
      type: EParsedContainerType.EXAMPLE,
      height: component.height || 'auto',
    }
  }

  private _createContentData(content: { fileName: string, url: string }, height?: string): IParsedContainerData {
    return {
      tab: content.fileName,
      value: content.url,
      isLink: true,
      type: EParsedContainerType.CODE,
      height,
    }
  }

  private _parseNgComponent(token: IMarkdownItToken): IMarkdownContainerData | null {
    if (!this._isNgComponent(token)) {
      return null;
    }

    const cleanedInput = token.info.replace(/ng-component\s*/, '');

    const tagMatch = cleanedInput.match(/<([a-zA-Z0-9-]+)>.*<\/\1>/);
    const heightMatch = cleanedInput.match(/\[height\]="(\d+)"/);

    if (!tagMatch) {
      throw new Error("Invalid input: no valid tag found");
    }

    const tag = tagMatch[0];
    const height = heightMatch ? heightMatch[1] : undefined;

    return { tag, height };
  }

  private _isNgComponent(token: IMarkdownItToken): boolean {
    return token.info.trim().startsWith(EMarkdownContainerType.EXAMPLE_GROUP);
  }

  private _parseData(data: string): { fileName: string, url: string }[] {
    return data.split('\n').map(this._extractFileData).filter(Boolean) as { fileName: string, url: string }[];
  }

  private _extractFileData(line: string): { fileName: string, url: string } | null {
    const match = line.match(/\[(.+?)\] <<< (.+)/);
    return match ? { fileName: match[1], url: match[2] } : null;
  }

  private _openingExampleGroupHTML(data: IParsedContainerData[]): string {
    const jsonData = JSON.stringify(data).replace(/"/g, '&quot;');
    return `<f-code-group data-data="${jsonData}">`;
  }
}
