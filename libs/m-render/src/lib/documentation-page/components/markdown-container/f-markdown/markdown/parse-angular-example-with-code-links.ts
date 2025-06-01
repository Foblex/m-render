import { EMarkdownContainerType } from './domain';
import { IMarkdownItToken } from './domain';

import container from 'markdown-it-container';
import { EParsedContainerType, IMarkdownContainerData, IParsedContainerData } from './domain';
import { encodeDataAttr, getContent, isOpeningToken, parseFileLinkLine } from './utils';

type ContainerArgs = [typeof container, string, { render: any }];

export class ParseAngularExampleWithCodeLinks {

  public render(): ContainerArgs {
    return [container, EMarkdownContainerType.EXAMPLE_GROUP, {
      render: (tokens: IMarkdownItToken[], index: number) => {
        return isOpeningToken(tokens[index]) ? this._opening(tokens, index) : '</f-code-group>';
      },
    }];
  }

  private _opening(tokens: IMarkdownItToken[], index: number): string {
    const data = this._collectData(tokens, index);
    return `<f-code-group data-data="${encodeDataAttr(data)}">`;
  }

  private _collectData(tokens: IMarkdownItToken[], index: number): IParsedContainerData[] {
    const result: IParsedContainerData[] = [];

    const component = this._parseNgComponent(tokens[index]);
    const height = component?.height || 'auto';
    if (component) {
      result.push({
        tab: 'Example',
        value: component.tag,
        type: EParsedContainerType.EXAMPLE,
        height: component.height || 'auto',
      });
    }
    const content = getContent(tokens, index, EMarkdownContainerType.EXAMPLE_GROUP);
    const items = (content || '').split('\n').map(parseFileLinkLine).filter(Boolean) as {
      fileName: string,
      url: string
    }[];
    items.forEach(({ fileName, url }) => result.push({
      tab: fileName,
      value: url,
      isLink: true,
      type: EParsedContainerType.CODE,
      height,
    }));

    return result;
  }

  private _parseNgComponent(token: IMarkdownItToken): IMarkdownContainerData | null {
    const cleanedInput = token.info.replace(/ng-component\s*/, '');
    const tagMatch = cleanedInput.match(/<([a-zA-Z0-9-]+)>.*<\/\1>/);
    const heightMatch = cleanedInput.match(/\[height\]="(\d+)"/);

    if (!tagMatch) return null;

    return {
      tag: tagMatch[0],
      height: heightMatch?.[1],
    };
  }
}
