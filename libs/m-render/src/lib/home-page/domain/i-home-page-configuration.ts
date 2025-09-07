import { Type } from '@angular/core';
import { ILogoConfiguration, ITitleConfiguration } from '../../common';
import { IHomePageFeature, IHomePageFooter, IHomePageHero, IHomePageLink } from './configuration-providers';

export interface IHomePageConfiguration
  extends ITitleConfiguration, ILogoConfiguration {

  background?: Type<any>;

  hero: IHomePageHero;

  image?: Type<any>;

  buttons?: IHomePageLink[];

  features?: IHomePageFeature[];

  //memberships?: IHomePageMembership[];

  footer: IHomePageFooter;
}
