import { inject, Injectable, Type } from '@angular/core';
import {
  HOME_PAGE_CONFIGURATION,
  IHomePageFeature,
  IHomePageFooter,
  IHomePageHero,
  IHomePageLink,
  IHomePageMembership,
} from '../domain';

@Injectable()
export class HomeStore {
  private readonly _configuration = inject(HOME_PAGE_CONFIGURATION);

  public getLogo(): string {
    return this._configuration.logo;
  }

  public getTitle(): string {
    return this._configuration.title;
  }

  public getHero(): IHomePageHero {
    return this._configuration.hero;
  }

  public getButtons(): IHomePageLink[] {
    return this._configuration.buttons || [];
  }

  public getFeatures(): IHomePageFeature[] {
    return this._configuration.features || [];
  }

  public getMemberships(): IHomePageMembership[] {
    return [];
  }

  public getFooter(): IHomePageFooter {
    return this._configuration.footer;
  }

  public getBackgroundComponent(): Type<any> | undefined {
    return this._configuration.background;
  }

  public getImageComponent(): Type<any> | undefined {
    return this._configuration.image;
  }
}
