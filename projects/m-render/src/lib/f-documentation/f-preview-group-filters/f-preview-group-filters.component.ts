import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FDocumentationEnvironmentService } from '../f-documentation-environment.service';
import { FCheckboxComponent, FRadioButtonComponent } from '../../common-components';
import { TitleCasePipe } from '@angular/common';
import { FPreviewGroupService } from '../f-preview-group/f-preview-group.service';

@Component({
  selector: 'div[f-preview-group-filters]',
  templateUrl: './f-preview-group-filters.component.html',
  styleUrls: [ './f-preview-group-filters.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FCheckboxComponent,
    FRadioButtonComponent,
    TitleCasePipe
  ]
})
export class FPreviewGroupFiltersComponent implements AfterViewInit {

  private readonly _allKey = 'all';

  private _fEnvironment = inject(FDocumentationEnvironmentService);
  private _fPreviewGroupService = inject(FPreviewGroupService);

  protected filters = signal<string[]>([]);
  protected activeFilter = signal<string>(this._allKey);

  protected isSortByDateChecked = signal<boolean>(false);

  public initialize(): void {
    this.filters.set(this._calculateFiltersMap());
  }

  public ngAfterViewInit(): void {
    this.onFilterChange(this._allKey);
  }

  private _calculateFiltersMap(): string[] {
    const filters: string[] = [];
    this._fEnvironment.getNavigation().forEach((group) => {
      group.items.forEach((item) => {
        if (item.badge && !filters.includes(item.badge.text.toLowerCase())) {
          filters.push(item.badge.text.toLowerCase());
        }
      });
    });
    if (filters.length > 0) {
      filters.unshift(this._allKey);
    }
    return filters;
  }

  protected onFilterChange(key: string): void {
    this.activeFilter.set(key);
    this._fPreviewGroupService.filterBy(key, this._allKey);
  }

  protected onSortByDateChange(event: boolean): void {
    this.isSortByDateChecked.set(event);
    this._fPreviewGroupService.sortByDate(event);
  }
}
