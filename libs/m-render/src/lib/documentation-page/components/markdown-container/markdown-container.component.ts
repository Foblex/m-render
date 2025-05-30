import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FMarkdownRendererComponent } from './f-markdown';

@Component({
  selector: 'f-markdown-container',
  templateUrl: './markdown-container.component.html',
  styleUrls: [ './markdown-container.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FMarkdownRendererComponent,
  ],
  host: {
    'ngSkipHydration': '',
  },
})
export class MarkdownContainerComponent {}
