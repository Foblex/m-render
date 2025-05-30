import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { HamburgerButtonComponent } from './hamburger-button';
import { DocumentationStore } from '../../services';
import {
  DropdownMenuComponent,
  FSocialLinksComponent,
  FThemeButtonComponent,
  InlineMenuComponent,
  NpmVersionComponent,
} from '../../../common';

@Component({
  selector: 'f-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HamburgerButtonComponent,
    NpmVersionComponent,
    FSocialLinksComponent,
    FThemeButtonComponent,
    InlineMenuComponent,
    DropdownMenuComponent,
  ],
})
export class HeaderComponent {
  protected title = inject(DocumentationStore).getTitle();
}
