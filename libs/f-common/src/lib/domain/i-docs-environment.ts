import { IDocsComponent } from './index';
import { ITableOfContent } from './index';
import { IDocsHeaderNavigationItem } from './index';
import { INavigationGroup, INpmVersion, ISocialLink } from '../components';
import { IMarkdownFooterNavigation } from '../components';

export interface IDocsEnvironment {

  lang: string;

  docsDir: string;

  notFoundMD: string;

  logo: string;

  title: string;

  version?: INpmVersion;

  headerNavigation?: IDocsHeaderNavigationItem[];

  navigation: INavigationGroup[];

  footerNavigation?: IMarkdownFooterNavigation;

  components?: IDocsComponent[];

  socialLinks?: ISocialLink[];

  toC?: ITableOfContent;
}
