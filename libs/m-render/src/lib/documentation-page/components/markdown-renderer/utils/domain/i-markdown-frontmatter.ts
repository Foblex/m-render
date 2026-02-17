import { ISeoOverrides } from '../../../../analytics';

export interface IMarkdownPageLayoutOptions {
  hideTableOfContent: boolean;
  expandContentWithoutTableOfContent: boolean;
}

export interface IMarkdownFrontMatterData {
  layout: IMarkdownPageLayoutOptions;
  seo: ISeoOverrides | null;
}

export interface IMarkdownFrontMatterParseResult {
  markdown: string;
  data: IMarkdownFrontMatterData;
}

export const DEFAULT_MARKDOWN_PAGE_LAYOUT_OPTIONS: IMarkdownPageLayoutOptions = {
  hideTableOfContent: false,
  expandContentWithoutTableOfContent: false,
};
