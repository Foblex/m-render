import {
  ChangeDetectionStrategy,
  Component, inject,
} from '@angular/core';
import { F_SOCIAL_LINKS_PROVIDER } from './domain';

@Component({
  selector: 'f-social-links',
  templateUrl: './f-social-links.component.html',
  styleUrls: [ './f-social-links.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSocialLinksComponent {

  protected links = inject(F_SOCIAL_LINKS_PROVIDER).getSocialLinks();
}
