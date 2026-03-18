import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
} from '@angular/core';
import { EXAMPLE_VIEW } from '@foblex/m-render';

@Component({
  selector: 'example',
  styleUrls: [ './example.component.scss' ],
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ExampleComponent {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _exampleView = inject(EXAMPLE_VIEW, { optional: true });
  private _loadingTimeout: ReturnType<typeof setTimeout> | null = null;
  private _loadingVisible = false;

  protected readonly isFullscreen = computed(() => this._exampleView?.isFullscreen() ?? false);
  protected readonly fullscreenLabel = computed(() => this.isFullscreen() ? 'Fullscreen' : 'Embedded');

  public constructor() {
    this._destroyRef.onDestroy(() => {
      if (this._loadingTimeout) {
        clearTimeout(this._loadingTimeout);
      }

      if (this._loadingVisible) {
        this._exampleView?.hideLoading();
      }
    });
  }

  protected simulateLoading(): void {
    if (!this._exampleView) return;

    if (!this._loadingVisible) {
      this._exampleView.showLoading();
      this._loadingVisible = true;
    }

    if (this._loadingTimeout) {
      clearTimeout(this._loadingTimeout);
    }

    this._loadingTimeout = setTimeout(() => {
      this._exampleView?.hideLoading();
      this._loadingVisible = false;
      this._loadingTimeout = null;
    }, 1600);
  }
}
