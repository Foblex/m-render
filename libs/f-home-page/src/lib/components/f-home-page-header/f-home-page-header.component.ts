import { Component, inject } from '@angular/core';
import { FThemeButtonComponent } from '@f-common';
import { FEnvironmentService } from '../../services';

@Component({
  selector: 'header[f-home-page-header]',
  templateUrl: './f-home-page-header.component.html',
  styleUrl: './f-home-page-header.component.scss',
  standalone: true,
  imports: [
    FThemeButtonComponent,
  ],
})
export class FHomePageHeaderComponent {

  protected logo = inject(FEnvironmentService).getLogo();

  protected title = inject(FEnvironmentService).getTitle();
}
