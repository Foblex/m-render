import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FHamburgerButtonComponent } from '../f-hamburger-button/f-hamburger-button.component';
import { FVersionComponent } from '../f-version/f-version.component';
import { FSocialLinksComponent } from '../f-social-links/f-social-links.component';
import { FEnvironmentService } from '../../domain';
import { FThemeButtonComponent } from '../f-theme-button/f-theme-button.component';
import { FHeaderMenuComponent } from '../f-header-menu/f-header-menu.component';

@Component({
  selector: 'f-header',
  templateUrl: './f-header.component.html',
  styleUrls: [ './f-header.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    FHamburgerButtonComponent,
    FVersionComponent,
    FSocialLinksComponent,
    FThemeButtonComponent,
    FHeaderMenuComponent
  ]
})
export class FHeaderComponent {

  protected title: string = '';

  constructor(
    private fEnvironmentService: FEnvironmentService
  ) {
    this.title = this.fEnvironmentService.getTitle();
  }
}
