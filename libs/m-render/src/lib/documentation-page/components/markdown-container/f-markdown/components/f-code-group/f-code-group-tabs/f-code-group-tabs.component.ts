import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { IParsedContainerData } from '../../../markdown';

@Component({
  selector: 'f-code-group-tabs',
  templateUrl: './f-code-group-tabs.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'f-code-group-tabs',
    '[style.display]': 'display()',
  },
})
export class FCodeGroupTabsComponent {
  public data = input<IParsedContainerData[]>([]);
  public tabIndex = output<number>();

  protected display = computed(() => {
    const data = this.data();
    return !data.length || data.length === 1 ? 'none' : 'block';
  });
  protected index = signal<number>(0);

  protected onTabClick(index: number): void {
    this.index.set(index);
    this.tabIndex.emit(index);
  }
}
