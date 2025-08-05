import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { HamburgerButtonComponent } from './hamburger-button';
import { DocumentationStore } from '../../services';
import {
  FSearchButtonComponent,
  FSocialLinksComponent,
  InlineMenuComponent,
} from '../../../common';
import { ThemeButtonComponent } from '../../../theme';

@Component({
  selector: 'f-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HamburgerButtonComponent,
    FSocialLinksComponent,
    ThemeButtonComponent,
    InlineMenuComponent,
    FSearchButtonComponent,
  ],
})
export class HeaderComponent {
  protected title = inject(DocumentationStore).getTitle();

  protected config = inject(DocumentationStore).getHeader();
}
