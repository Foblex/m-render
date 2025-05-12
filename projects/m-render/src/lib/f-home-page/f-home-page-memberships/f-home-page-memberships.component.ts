import { Component, inject } from '@angular/core';
import { FHomePageEnvironmentService } from '../f-home-page-environment.service';

@Component({
  selector: 'f-home-page-memberships',
  templateUrl: './f-home-page-memberships.component.html',
  styleUrl: './f-home-page-memberships.component.scss',
  standalone: true,
  host: {
    '[class.display-none]': '!viewModel.length',
  }
})
export class FHomePageMembershipsComponent {
  protected viewModel = inject(FHomePageEnvironmentService).getMemberships();
}
