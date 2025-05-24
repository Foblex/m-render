import {
  ChangeDetectionStrategy,
  Component, input, Input,
} from '@angular/core';
import { ITableOfContentItem } from '../domain';

@Component({
  selector: 'ul[f-table-of-content-items]',
  styleUrls: [ './f-table-of-content-items.component.scss' ],
  templateUrl: './f-table-of-content-items.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
})
export class FTableOfContentItemsComponent {

  public items = input.required<ITableOfContentItem[]>();
}
