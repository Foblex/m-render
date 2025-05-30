import { Type } from '@angular/core';
import { IHasHeaderConfiguration, ILogoConfiguration, ITitleConfiguration } from '../../common';
import { IHomePageFeature, IHomePageFooter, IHomePageHero, IHomePageLink } from './configuration-providers';

export interface IHomePageConfiguration
  extends ITitleConfiguration, ILogoConfiguration, IHasHeaderConfiguration {

  background?: Type<any>;

  hero: IHomePageHero;

  image?: Type<any>;

  buttons?: IHomePageLink[];

  features?: IHomePageFeature[];

  //memberships?: IHomePageMembership[];

  footer: IHomePageFooter;
}
