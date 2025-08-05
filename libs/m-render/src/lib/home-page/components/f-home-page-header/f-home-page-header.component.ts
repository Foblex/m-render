import { Component, inject } from '@angular/core';
import { HomeStore } from '../../services';
import { ThemeButtonComponent } from '../../../theme';
import { FSearchButtonComponent } from '../../../common';

@Component({
  selector: 'header[f-home-page-header]',
  templateUrl: './f-home-page-header.component.html',
  styleUrl: './f-home-page-header.component.scss',
  standalone: true,
  imports: [
    ThemeButtonComponent,
    FSearchButtonComponent,
  ],
})
export class FHomePageHeaderComponent {
  protected logo = inject(HomeStore).getLogo();
  protected title = inject(HomeStore).getTitle();

  protected config = inject(HomeStore).getHeader();
}
