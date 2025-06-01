import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { HamburgerButtonComponent } from './hamburger-button';
import { DocumentationStore } from '../../services';
import {
  FSocialLinksComponent,
  FThemeButtonComponent,
  InlineMenuComponent,
} from '../../../common';

@Component({
  selector: 'f-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HamburgerButtonComponent,
    FSocialLinksComponent,
    FThemeButtonComponent,
    InlineMenuComponent,
  ],
})
export class HeaderComponent {
  protected title = inject(DocumentationStore).getTitle();
}
