import { Component, inject } from '@angular/core';
import { HomeStore } from '../../services';

@Component({
  selector: 'f-home-page-features',
  templateUrl: './f-home-page-features.component.html',
  styleUrl: './f-home-page-features.component.scss',
  standalone: true,
  host: {
    '[class.display-none]': '!viewModel.length',
  },
})
export class FHomePageFeaturesComponent {
  protected viewModel = inject(HomeStore).getFeatures();
}
