import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { TOGGLE_NAVIGATION_COMPONENT } from './domain';

@Component({
  selector: 'button[hamburger-button]',
  templateUrl: './hamburger-button.component.html',
  styleUrls: [ './hamburger-button.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': '_onShowNavigation()',
  },
})
export class HamburgerButtonComponent {
  private readonly _parent = inject(TOGGLE_NAVIGATION_COMPONENT, {
    optional: true,
  });

  protected _onShowNavigation(): void {
    this._parent?.onToggleNavigation(true);
  }
}
