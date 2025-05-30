import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, signal } from '@angular/core';
import { RIGHT_TOP_OVERLAY_POSITION } from './domain';
import { CdkConnectedOverlay, CdkOverlayOrigin, Overlay } from '@angular/cdk/overlay';
import { ILink } from '../../../domain';

@Component({
  selector: 'dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
  ],
})
export class DropdownMenuComponent implements OnDestroy {

  public label = input<string>('Menu');
  public links = input<ILink[]>([]);

  protected readonly isOpen = signal(false);
  protected readonly scrollStrategy = inject(Overlay).scrollStrategies.block();
  protected readonly positions = RIGHT_TOP_OVERLAY_POSITION;

  private _hoverTimeout: any | undefined;

  protected mouseEnter(): void {
    clearTimeout(this._hoverTimeout);
    this.open();
  }

  protected mouseLeave(): void {
    clearTimeout(this._hoverTimeout);
    this._hoverTimeout = setTimeout(() => this.close(), 200);
  }

  protected toggle(): void {
    this.isOpen.update(x => !x);
  }

  protected open(): void {
    if (!this.isOpen()) {
      this.isOpen.set(true);
    }
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  public ngOnDestroy(): void {
    clearTimeout(this._hoverTimeout);
  }
}
