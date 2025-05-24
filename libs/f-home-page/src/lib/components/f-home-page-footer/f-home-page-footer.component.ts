import { Component, inject } from '@angular/core';
import { FEnvironmentService } from '../../services';

@Component({
  selector: 'footer[f-home-page-footer]',
  templateUrl: './f-home-page-footer.component.html',
  styleUrl: './f-home-page-footer.component.scss',
  standalone: true,
})
export class FHomePageFooterComponent {

  protected viewModel = inject(FEnvironmentService).getFooter();
}
