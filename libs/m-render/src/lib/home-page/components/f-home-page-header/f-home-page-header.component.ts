import { Component, inject } from '@angular/core';
import { HomeStore } from '../../services';
import { ThemeButtonComponent } from '../../../theme';

@Component({
  selector: 'header[f-home-page-header]',
  templateUrl: './f-home-page-header.component.html',
  styleUrl: './f-home-page-header.component.scss',
  standalone: true,
  imports: [
    ThemeButtonComponent,
  ],
})
export class FHomePageHeaderComponent {
  protected logo = inject(HomeStore).getLogo();
  protected title = inject(HomeStore).getTitle();
}
