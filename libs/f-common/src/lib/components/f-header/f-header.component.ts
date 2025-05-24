import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { FHamburgerButtonComponent } from './f-hamburger-button/f-hamburger-button.component';
import { F_NAVIGATION_PROVIDER } from '../../domain';
import { FThemeButtonComponent } from '../f-theme-button/f-theme-button.component';
import { FHeaderMenuComponent } from './f-header-menu/f-header-menu.component';
import { FSocialLinksComponent } from '../f-social-links';
import { FVersionComponent } from '../f-version';

@Component({
  selector: 'f-header',
  templateUrl: './f-header.component.html',
  styleUrls: [ './f-header.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FHamburgerButtonComponent,
    FVersionComponent,
    FSocialLinksComponent,
    FThemeButtonComponent,
    FHeaderMenuComponent,
  ],
})
export class FHeaderComponent {

  protected title = inject(F_NAVIGATION_PROVIDER).getTitle();
}
