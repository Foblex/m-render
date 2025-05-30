import { FExecutionRegister, IHandler } from '@foblex/mediator';
import { RenderDynamicComponentsRequest } from './render-dynamic-components.request';
import { ComponentRef, inject, Injectable, Type, ViewContainerRef } from '@angular/core';
import { FCodeGroupComponent, FPreviewComponent, FPreviewGroupFiltersComponent } from '../../../index';
import { DocumentationStore } from '../../../../services';

interface DynamicComponentDescriptor {
  tag: string;
  component: Type<any>;
}

@Injectable()
@FExecutionRegister(RenderDynamicComponentsRequest)
export class RenderDynamicComponentsHandler implements IHandler<RenderDynamicComponentsRequest> {

  private readonly _provider = inject(DocumentationStore);
  private readonly _containerRef = inject(ViewContainerRef);

  private readonly _componentsMap: DynamicComponentDescriptor[] = [
    { tag: 'f-code-group', component: FCodeGroupComponent },
    { tag: 'f-preview', component: FPreviewComponent },
    { tag: 'f-preview-group-filters', component: FPreviewGroupFiltersComponent },
  ];

  public handle(request: RenderDynamicComponentsRequest): void {
    this._provider.disposeDComponents();

    this._componentsMap.forEach(({ tag, component }) => {
      const elements = this._queryElements(request.hostElement, tag);
      if (elements.length) {
        elements.forEach((x) => {
          try {
            this._renderComponent(x, component);
          } catch (error) {
            this._logError(tag, error);
          }
        });
      }
    });
  }

  private _queryElements(root: HTMLElement, tag: string): HTMLElement[] {
    return Array.from(root.querySelectorAll(tag));
  }

  private _renderComponent(element: HTMLElement, component: Type<any>): void {
    const componentRef = this._containerRef.createComponent(component);
    this._provider.dComponents.update((x) => {
      x.push(componentRef);
      return x;
    });

    this._assignInputs(componentRef, element);
    componentRef.instance?.initialize?.();

    const newElement = this._extractComponentRoot(componentRef);
    element.replaceWith(newElement);
  }

  private _assignInputs(componentRef: ComponentRef<any>, element: HTMLElement): void {
    const dataset = element.dataset;
    if (!dataset) return;

    Object.entries(dataset).forEach(([key, rawValue]) => {
      let value = rawValue;
      if (value?.startsWith?.('{') || value?.startsWith?.('[')) {
        try {
          value = JSON.parse(value);
          // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
        } catch (e) { /* empty */ }
      }
      if (componentRef.instance[key]?.set) {
        componentRef.instance[key].set(value);
      } else {
        componentRef.instance[key] = value;
      }
    });
  }

  private _extractComponentRoot(componentRef: ComponentRef<any>): HTMLElement {
    componentRef.changeDetectorRef.markForCheck();
    return (componentRef.hostView as any).rootNodes[0] as HTMLElement;
  }

  private _logError(tag: string, error: any): void {
    console.error(`Error inserting component for <${tag}>:`, error);
  }
}
