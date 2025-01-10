import {
  ChangeDetectionStrategy,
  Component, inject
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import {
  FHamburgerButtonComponent, FHeaderMenuComponent,
  FSocialLinksComponent,
  FThemeButtonComponent,
  FVersionComponent
} from '../../common-components';
import { FDocumentationEnvironmentService } from '../f-documentation-environment.service';

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

  protected title: string = inject(FDocumentationEnvironmentService).getTitle();
}
