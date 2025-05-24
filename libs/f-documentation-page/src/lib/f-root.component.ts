import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit, signal,
} from '@angular/core';
import { F_MARKDOWN_FOOTER_NAVIGATION, FScrollableContainerComponent } from '@f-common';
import { RouterOutlet } from '@angular/router';
import { FEnvironmentService } from './services/f-environment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FPreviewGroupService } from './components/f-preview-group/f-preview-group.service';
import {
  F_NAVIGATION_PROVIDER, F_NPM_VERSION_PROVIDER, F_SOCIAL_LINKS_PROVIDER, F_TABLE_OF_CONTENT_PROVIDER,
  F_TOGGLE_NAVIGATION_COMPONENT,
  FHeaderComponent,
  FNavigationPanelComponent,
  FPopoverService,
  IToggleNavigationComponent,
} from '@f-common';
import {
  F_EXAMPLE_COMPONENT_PROVIDER,
  F_PREVIEW_NAVIGATION_PROVIDER,
} from '@f-markdown';

@Component({
  selector: 'f-root',
  templateUrl: './f-root.component.html',
  styleUrls: ['./f-root.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FEnvironmentService,
    {
      provide: F_EXAMPLE_COMPONENT_PROVIDER,
      useExisting: FEnvironmentService,
    },
    {
      provide: F_PREVIEW_NAVIGATION_PROVIDER,
      useExisting: FEnvironmentService,
    },
    {
      provide: F_NAVIGATION_PROVIDER,
      useExisting: FEnvironmentService,
    },
    {
      provide: F_SOCIAL_LINKS_PROVIDER,
      useExisting: FEnvironmentService,
    },
    {
      provide: F_NPM_VERSION_PROVIDER,
      useExisting: FEnvironmentService,
    },
    {
      provide: F_TABLE_OF_CONTENT_PROVIDER,
      useExisting: FEnvironmentService,
    },
    {
      provide: F_MARKDOWN_FOOTER_NAVIGATION,
      useExisting: FEnvironmentService,
    },
    FPreviewGroupService,
    {
      provide: F_TOGGLE_NAVIGATION_COMPONENT,
      useExisting: FRootComponent,
    },
  ],
  imports: [
    FNavigationPanelComponent,
    FHeaderComponent,
    FScrollableContainerComponent,
    RouterOutlet,
  ],
})
export class FRootComponent
  implements OnInit, IToggleNavigationComponent {
  protected isNavigationVisible = signal<boolean>(false);
  protected popoverMessage: string | null = null;

  private _fPopover = inject(FPopoverService);
  private _destroyRef = inject(DestroyRef);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  public ngOnInit() {
    this._fPopover.dispose(this._destroyRef);
    this._subscribeOnPopover();
  }

  private _subscribeOnPopover(): void {
    this._fPopover.popover$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((x) => {
        this.popoverMessage = x;
        this._changeDetectorRef.markForCheck();
      });
  }

  public onToggleNavigation(value: boolean): void {
    this.isNavigationVisible.set(value);
  }
}
