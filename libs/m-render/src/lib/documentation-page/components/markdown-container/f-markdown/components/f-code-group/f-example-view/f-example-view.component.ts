import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal, Type } from '@angular/core';
import { IExampleComponent } from './domain/i-example-component';
import { coerceComponentHeight } from './utils/coerce-component-height';
import { parseComponentTag } from './utils/parse-component-tag';
import { FInsertComponentDirective } from './directives/f-insert-component.directive';
import { IExampleViewData } from './domain/i-example-view-data';
import { isPromise } from './utils/is-promise';
import { IParsedContainerData } from '../../../markdown';
import { IExampleComponentInstance } from './domain/i-example-component-instance';
import { DocumentationStore } from '../../../../../../services';

@Component({
  selector: 'f-example-view',
  templateUrl: './f-example-view.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FInsertComponentDirective,
  ],
  host: {
    class: 'f-example-view',
    '[style.height]': 'data().height',
  },
})
export class FExampleViewComponent implements OnInit {

  public data = input.required<IExampleViewData, IParsedContainerData>({
    transform: (x) => {
      return {
        height: coerceComponentHeight(x.height),
        value: parseComponentTag(x.value) || '',
      };
    },
  });

  protected errors = signal<string>('');
  protected component = signal<Type<IExampleComponentInstance> | null>(null);

  private readonly _provider = inject(DocumentationStore);

  public ngOnInit(): void {
    const result = this._findComponentByTag(this.data().value);
    if (!result || !result.component) {
      this.errors.set(`Component with tag "${this.data().value}" not found`);
      return;
    }
    const { component, selector } = result;

    if (isPromise(component)) {
      this._loadAndAddComponentToContainer(component, selector);
    } else {
      this.component.set(component);
    }
  }

  private _findComponentByTag(selector: string | null): IExampleComponent | undefined {
    return this._provider?.getComponents()
      ?.find((component) => component.selector === selector);
  }

  private _logComponentResolutionError(tag: string): void {
    console.error(`Component for tag "${tag}" could not be resolved.`);
  }

  private _logComponentLoadingError(tag: string, error: object): void {
    console.error(`Error while loading component for tag "${tag}":`, error);
  }

  private _loadAndAddComponentToContainer(lazyComponent: Promise<Type<IExampleComponentInstance>>, tag: string): void {
    lazyComponent.then(extracted => {
      this.component.set(extracted);
      if (!extracted) {
        this._logComponentResolutionError(tag);
      }
    }).catch(error => this._logComponentLoadingError(tag, error));
  }
}
