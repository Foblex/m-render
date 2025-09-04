import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  F_PREVIEW_NAVIGATION_PROVIDER,
  HeaderComponent,
  IToggleNavigationComponent,
  NavigationPanelComponent,
  ScrollableContainerComponent,
  TOGGLE_NAVIGATION_COMPONENT,
} from './components';
import { DocumentationStore } from './services';
import {
  F_SOCIAL_LINKS_PROVIDER,
  HEADER_CONFIGURATION_STORE, IS_BROWSER_PLATFORM,
  PopoverService,
  ThemeService,
} from '../common';
import { FMetaService } from './analytics';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CookiePopupComponent } from '../analytics/cookie-popup/cookie-popup.component';
import { GTagService } from '../analytics';

@Component({
  selector: 'documentation',
  templateUrl: './documentation.html',
  styleUrls: ['./documentation.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DocumentationStore,
    FMetaService,
    {
      provide: F_PREVIEW_NAVIGATION_PROVIDER,
      useExisting: DocumentationStore,
    },
    {
      provide: F_SOCIAL_LINKS_PROVIDER,
      useExisting: DocumentationStore,
    },
    {
      provide: HEADER_CONFIGURATION_STORE,
      useExisting: DocumentationStore,
    },
    {
      provide: TOGGLE_NAVIGATION_COMPONENT,
      useExisting: Documentation,
    },
  ],
  imports: [
    NavigationPanelComponent,
    ScrollableContainerComponent,
    RouterOutlet,
    HeaderComponent,
    CookiePopupComponent,
  ],
})
export class Documentation implements IToggleNavigationComponent, OnInit, OnDestroy {
  protected readonly isNavigationVisible = signal<boolean>(false);
  protected readonly popover = inject(PopoverService).message;

  private readonly _metaService = inject(FMetaService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _gTagService = inject(GTagService, { optional: true });
  private readonly _themeService = inject(ThemeService, { optional: true });

  protected readonly isBrowser = inject(IS_BROWSER_PLATFORM);

  public ngOnInit() {
    if (!this.isBrowser) {
      return;
    }
    this._themeService?.initialize();
    this._gTagService?.initialize();
    this._metaService.changes().pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  public onToggleNavigation(value: boolean): void {
    this.isNavigationVisible.set(value);
  }

  public ngOnDestroy(): void {
    this._metaService.dispose();
    // Cleanup logic if needed
  }
}
