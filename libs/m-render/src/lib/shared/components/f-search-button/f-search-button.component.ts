import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'f-search-button',
  templateUrl: './f-search-button.component.html',
  styleUrls: ['./f-search-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
  ],
})
export class FSearchButtonComponent {
}
