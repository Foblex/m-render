import { IExampleComponent, IMarkdownFooterNavigation, INavigationGroup, ITableOfContent } from '../components';
import {
  IHasHeaderConfiguration,
  ILanguageConfiguration,
  ILogoConfiguration,
  ITitleConfiguration,
} from '../../common';
import { IMetaData } from '../analytics';

export interface IDocumentationConfiguration
  extends ILanguageConfiguration, ITitleConfiguration, ILogoConfiguration, IHasHeaderConfiguration {

  docsDir: string;

  notFoundMarkdown: string;

  navigation: INavigationGroup[];

  footer?: IDocumentationFooterConfiguration;

  components?: IExampleComponent[];

  toC?: ITableOfContent;

  meta?: IMetaData;
}

export interface IDocumentationFooterConfiguration {

  navigation?: IMarkdownFooterNavigation;
}
