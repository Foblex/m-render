import { inject, Injectable, Type } from '@angular/core';
import { ENVIRONMENT } from '../providers';
import {
  IHomePageFeature,
  IHomePageFooter,
  IHomePageHero,
  IHomePageLink,
  IHomePageMembership,
} from '../domain';
import { ILogoTitleProvider } from '@f-common';

@Injectable()
export class FEnvironmentService implements ILogoTitleProvider {

  private readonly _environment = inject(ENVIRONMENT);

  public getLogo(): string {
    return this._environment.logo;
  }

  public getTitle(): string {
    return this._environment.title;
  }

  public getHero(): IHomePageHero {
    return this._environment.hero;
  }

  public getButtons(): IHomePageLink[] {
    return this._environment.buttons || [];
  }

  public getFeatures(): IHomePageFeature[] {
    return this._environment.features || [];
  }

  public getMemberships(): IHomePageMembership[] {
    return this._environment.memberships || [];
  }

  public getFooter(): IHomePageFooter {
    return this._environment.footer;
  }

  public getBackgroundComponent(): Type<any> | undefined {
    return this._environment.backgroundComponent;
  }

  public getImageComponent(): Type<any> | undefined {
    return this._environment.heroImageComponent;
  }
}
