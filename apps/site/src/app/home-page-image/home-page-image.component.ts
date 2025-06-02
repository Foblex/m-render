import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConsoleImageComponent } from './console/console-image.component';

@Component({
  selector: 'app-home-page-image',
  templateUrl: './home-page-image.component.html',
  styleUrl: './home-page-image.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ConsoleImageComponent,
  ],
})
export class HomePageImageComponent {

}
