import { INavigationGroup } from '../f-navigation-panel';
import { IDocsSocialLink } from './i-docs-social-link';
import { IDocsComponent } from './i-docs-component';
import { IDocsVersion } from './i-docs-version';
import { IDocsFooterNavigation } from './i-docs-footer-navigation';
import { IDocsTableOfContent } from './i-docs-table-of-content';
import { IDocsHeaderNavigationItem } from './i-docs-header-navigation-item';

export interface IDocsEnvironment {

  lang: string;

  docsDir: string;

  notFoundMD: string;

  logo: string;

  title: string;

  version?: IDocsVersion;

  headerNavigation?: IDocsHeaderNavigationItem[];

  navigation: INavigationGroup[];

  footerNavigation?: IDocsFooterNavigation;

  components?: IDocsComponent[];

  socialLinks?: IDocsSocialLink[];

  toC?: IDocsTableOfContent;
}
