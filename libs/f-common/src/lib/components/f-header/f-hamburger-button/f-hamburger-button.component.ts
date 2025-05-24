import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { F_TOGGLE_NAVIGATION_COMPONENT } from '../../../domain';

@Component({
  selector: 'button[f-hamburger-button]',
  templateUrl: './f-hamburger-button.component.html',
  styleUrls: [ './f-hamburger-button.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': '_onShowNavigation()',
  },
})
export class FHamburgerButtonComponent {

  private readonly _parent = inject(F_TOGGLE_NAVIGATION_COMPONENT, {
    optional: true,
  });

  protected _onShowNavigation(): void {
    this._parent?.onToggleNavigation(true);
  }
}
