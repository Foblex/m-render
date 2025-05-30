import {
  ChangeDetectionStrategy,
  Component, input,
} from '@angular/core';
import { ITableOfContentItem } from '../../../domain';

@Component({
  selector: 'ul[f-table-of-content-items]',
  styleUrls: [ './table-of-content-items.component.scss' ],
  templateUrl: './table-of-content-items.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
})
export class TableOfContentItemsComponent {
  public readonly items = input.required<ITableOfContentItem[]>();
}
