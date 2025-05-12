import {
  AfterViewInit,
  ChangeDetectionStrategy, Component, ComponentRef, inject, Type, ViewChild, ViewContainerRef
} from '@angular/core';
import { FHomePageFooterComponent } from './f-home-page-footer/f-home-page-footer.component';
import { FHomePageHeaderComponent } from './f-home-page-header/f-home-page-header.component';
import { FHomePageFeaturesComponent } from './f-home-page-features/f-home-page-features.component';
import { FHomePageHeroComponent } from './f-home-page-hero/f-home-page-hero.component';
import { FHomePageEnvironmentService } from './f-home-page-environment.service';
import { FHomePageMembershipsComponent } from './f-home-page-memberships/f-home-page-memberships.component';

@Component({
  selector: 'f-home-page',
  templateUrl: './f-home-page.component.html',
  styleUrls: [ './f-home-page.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FHomePageEnvironmentService,
  ],
  imports: [
    FHomePageFooterComponent,
    FHomePageHeaderComponent,
    FHomePageFeaturesComponent,
    FHomePageHeroComponent,
    FHomePageMembershipsComponent,
  ]
})
export class FHomePageComponent implements AfterViewInit {

  private _environment = inject(FHomePageEnvironmentService);

  @ViewChild('backgroundContainer', { read: ViewContainerRef })
  private _backgroundContainer: ViewContainerRef | undefined;

  @ViewChild('heroImageContainer', { read: ViewContainerRef })
  private _heroImageContainer: ViewContainerRef | undefined;

  public ngAfterViewInit(): void {
    this._renderImageComponent(this._environment.getImageComponent());
    this._renderBackgroundComponent(this._environment.getBackgroundComponent());
  }

  private _renderImageComponent<T>(component?: Type<T>): void {
    if (component) {
      this.requestComponentRedraw(this._getImageComponentReference(component));
    }
  }

  private _renderBackgroundComponent<T>(component?: Type<T>): void {
    if (component) {
      this.requestComponentRedraw(this._getBackgroundComponentReference(component));
    }
  }

  private _getBackgroundComponentReference<T>(component: Type<T>): ComponentRef<T> {
    return this._backgroundContainer!.createComponent(component);
  }

  private _getImageComponentReference<T>(component: Type<T>): ComponentRef<T> {
    return this._heroImageContainer!.createComponent(component);
  }

  private requestComponentRedraw(componentRef: ComponentRef<any>): void {
    componentRef.changeDetectorRef.markForCheck();
  }
}
