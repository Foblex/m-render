import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  inject,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { HomeStore } from './services';
import {
  FHomePageFeaturesComponent,
  FHomePageFooterComponent,
  FHomePageHeaderComponent,
  FHomePageHeroComponent,
  FHomePageMembershipsComponent,
} from './components';
import { HEADER_CONFIGURATION_STORE, IS_BROWSER_PLATFORM, ThemeService } from '../common';
import { CookiePopupComponent } from '../analytics/cookie-popup/cookie-popup.component';
import { GTagService } from '../analytics';

@Component({
  selector: 'home-root',
  templateUrl: './home-root.component.html',
  styleUrls: ['./home-root.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    HomeStore,
    {
      provide: HEADER_CONFIGURATION_STORE,
      useExisting: HomeStore,
    },
  ],
  imports: [
    FHomePageFooterComponent,
    FHomePageHeaderComponent,
    FHomePageFeaturesComponent,
    FHomePageHeroComponent,
    FHomePageMembershipsComponent,
    CookiePopupComponent,
  ],
})
export class HomeRootComponent implements AfterViewInit, OnInit {

  private readonly _environment = inject(HomeStore);
  private readonly _gTagService = inject(GTagService, { optional: true });
  private readonly _themeService = inject(ThemeService, { optional: true });

  protected readonly isBrowser = inject(IS_BROWSER_PLATFORM);

  @ViewChild('backgroundContainer', { read: ViewContainerRef })
  private _backgroundContainer: ViewContainerRef | undefined;

  @ViewChild('heroImageContainer', { read: ViewContainerRef })
  private _heroImageContainer: ViewContainerRef | undefined;

  public ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }
    this._themeService?.initialize();
    this._gTagService?.initialize();
  }

  public ngAfterViewInit(): void {
    this._renderImageComponent(this._environment.getImageComponent());
    this._renderBackgroundComponent(this._environment.getBackgroundComponent());
  }

  private _renderImageComponent<T>(component?: Type<T>): void {
    if (component) {
      this._requestComponentRedraw(this._getImageComponentReference(component));
    }
  }

  private _renderBackgroundComponent<T>(component?: Type<T>): void {
    if (component) {
      this._requestComponentRedraw(this._getBackgroundComponentReference(component));
    }
  }

  private _getBackgroundComponentReference<T>(component: Type<T>): ComponentRef<T> {
    return this._backgroundContainer!.createComponent(component);
  }

  private _getImageComponentReference<T>(component: Type<T>): ComponentRef<T> {
    return this._heroImageContainer!.createComponent(component);
  }

  private _requestComponentRedraw(componentRef: ComponentRef<any>): void {
    componentRef.changeDetectorRef.markForCheck();
  }
}
