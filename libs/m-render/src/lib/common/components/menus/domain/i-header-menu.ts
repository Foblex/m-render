import { IHeaderMenuLink } from './i-header-menu-link';
import { IVersion } from './i-version';

export interface IHeaderMenu {
  label?: string;
  icon?: string;
  version?: IVersion;
  links?: IHeaderMenuLink[];
}
