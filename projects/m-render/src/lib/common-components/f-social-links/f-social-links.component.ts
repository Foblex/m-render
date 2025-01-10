import {
  ChangeDetectionStrategy,
  Component, inject
} from '@angular/core';
import { INTERNAL_ENVIRONMENT_SERVICE } from '../../domain';

@Component({
  selector: 'f-social-links',
  templateUrl: './f-social-links.component.html',
  styleUrls: [ './f-social-links.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSocialLinksComponent {

  protected links = inject(INTERNAL_ENVIRONMENT_SERVICE).getSocialLinks();
}
