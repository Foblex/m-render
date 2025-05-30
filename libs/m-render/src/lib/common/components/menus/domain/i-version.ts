import { ILink } from '../../../domain';

export interface IVersion {
  text?: string;
  npmPackage?: string;
  links?: ILink[];
}
