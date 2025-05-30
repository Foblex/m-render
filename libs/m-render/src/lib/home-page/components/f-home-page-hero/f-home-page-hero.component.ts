import { Component, inject } from '@angular/core';
import { FHomePageButtonsRowComponent } from '../f-home-page-buttons-row';
import { HomeStore } from '../../services';

@Component({
  selector: 'f-home-page-hero',
  templateUrl: './f-home-page-hero.component.html',
  styleUrl: './f-home-page-hero.component.scss',
  standalone: true,
  imports: [
    FHomePageButtonsRowComponent,
  ],
})
export class FHomePageHeroComponent {

  protected viewModel = inject(HomeStore).getHero();
}
