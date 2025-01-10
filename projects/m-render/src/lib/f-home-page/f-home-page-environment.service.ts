import { Inject, Injectable, Optional, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { F_HOME_PAGE_ENVIRONMENT } from './providers';
import { IHomePageEnvironment, IHomePageFeature, IHomePageFooter, IHomePageHero, IHomePageLink } from './domain';
import {
  GetVersionHandler,
  GetVersionRequest,
  IDocsHeaderNavigationItem,
  IDocsSocialLink,
  IEnvironmentService
} from '../domain';

@Injectable()
export class FHomePageEnvironmentService implements IEnvironmentService {

  constructor(
    @Optional() @Inject(F_HOME_PAGE_ENVIRONMENT) private environment: IHomePageEnvironment,
    private http: HttpClient
  ) {
  }

  public getLogo(): string {
    return this.environment.logo;
  }

  public getTitle(): string {
    return this.environment.title;
  }

  public getHeaderNavigation(): IDocsHeaderNavigationItem[] {
    return this.environment.headerNavigation || [];
  }

  public getVersion(): Observable<string | undefined> {
    return new GetVersionHandler(this.http).handle(
      new GetVersionRequest(this.environment.version)
    );
  }

  public getSocialLinks(): IDocsSocialLink[] {
    return this.environment.socialLinks || [];
  }

  public getHero(): IHomePageHero {
    return this.environment.hero;
  }

  public getButtons(): IHomePageLink[] {
    return this.environment.buttons;
  }

  public getFeatures(): IHomePageFeature[] {
    return this.environment.features;
  }

  public getFooter(): IHomePageFooter {
    return this.environment.footer;
  }

  public getBackgroundComponent(): Type<any> | undefined {
    return this.environment.backgroundComponent;
  }

  public getImageComponent(): Type<any> | undefined {
    return this.environment.heroImageComponent;
  }
}
