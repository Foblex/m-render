import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { MarkdownRenderer } from './markdown-renderer';

@Component({
  selector: 'markdown-container',
  templateUrl: './markdown-container.html',
  styleUrls: [ './markdown-container.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MarkdownRenderer,
  ],
  host: {
    'ngSkipHydration': '',
  },
})
export class MarkdownContainer {}
