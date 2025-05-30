import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  F_PREVIEW_NAVIGATION_PROVIDER,
  FPreviewGroupService,
  HeaderComponent,
  IToggleNavigationComponent,
  NavigationPanelComponent,
  ScrollableContainerComponent,
  TOGGLE_NAVIGATION_COMPONENT,
} from './components';
import { DocumentationStore } from './services';
import { FMediator } from '@foblex/mediator';
import { COMMON_FEATURES } from './domain';
import { F_SOCIAL_LINKS_PROVIDER, HEADER_CONFIGURATION_STORE, PopoverService } from '../common';
import { FMetaService } from './analytics';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'documentation-root',
  templateUrl: './documentation-root.component.html',
  styleUrls: ['./documentation-root.component.scss'],
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
    FPreviewGroupService,
    {
      provide: TOGGLE_NAVIGATION_COMPONENT,
      useExisting: DocumentationRootComponent,
    },
    FMediator,
    ...COMMON_FEATURES,
  ],
  imports: [
    NavigationPanelComponent,
    ScrollableContainerComponent,
    RouterOutlet,
    HeaderComponent,
  ],
})
export class DocumentationRootComponent implements IToggleNavigationComponent, OnInit, OnDestroy {
  protected readonly isNavigationVisible = signal<boolean>(false);
  protected readonly popover = inject(PopoverService).message;

  private readonly _metaService = inject(FMetaService);
  private readonly _destroyRef = inject(DestroyRef);

  public ngOnInit() {
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
