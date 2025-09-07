import { ChangeDetectionStrategy, Component, computed, inject, signal, } from '@angular/core';
import { ShowcaseItem } from './components';
import { SHOWCASE_DATA } from './showcase-token';
import { IShowcaseItem } from './models';

@Component({
  selector: 'showcase',
  templateUrl: './showcase.html',
  styleUrls: [ './showcase.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ShowcaseItem,
  ],
})
export class Showcase{
  private readonly _data = signal<IShowcaseItem[]>(inject(SHOWCASE_DATA));

  protected readonly items = computed(() => {
    const items = this._data();
    const activeTag = this.activeTag();
    return activeTag ? items.filter(item => item.tags?.includes(activeTag)) : items;
  });

  protected readonly tags = computed(() => {
    return this._data().reduce((result, item) => {
      item.tags?.forEach(tag => result.add(tag));
      return result;
    }, new Set<string>());
  });

  protected readonly activeTag = signal<string | null>(null);

  protected tagClick(tag: string | null): void {
    this.activeTag.update((x) => x === tag ? null : tag);
  }
}
