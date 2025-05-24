import { IHandler } from '@foblex/mediator';
import { RenderDynamicComponentsRequest } from './render-dynamic-components.request';
import {
  ComponentRef,
  inject,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FPreviewGroupFiltersComponent } from '../../../f-preview-group-filters';
import { FCodeGroupComponent } from '@f-markdown';
import { FPreviewComponent } from '../../../f-preview';

@Injectable()
export class RenderDynamicComponentsHandler
  implements IHandler<RenderDynamicComponentsRequest> {
  private readonly _injector = inject(Injector);
  private _componentRefs: ComponentRef<any>[] = [];

  public handle(request: RenderDynamicComponentsRequest): void {
    this.dispose();
    const components = [
      {
        tag: 'f-code-group',
        component: FCodeGroupComponent,
      },
      {
        tag: 'f-preview',
        component: FPreviewComponent,
      },
      {
        tag: 'f-preview-group-filters',
        component: FPreviewGroupFiltersComponent,
      },
    ];

    components.forEach((data) => {
      const elements = this._getDynamicElements(request.hostElement, data.tag);
      if (elements.length) {
        elements.forEach((x) => {
          try {
            this._changeElementToComponent(x, data.component);
          } catch (error) {
            this._logComponentInsertionError(data.tag, error);
          }
        });
      }
    });
  }

  private _getDynamicElements(
    hostElement: HTMLElement,
    tag: string,
  ): HTMLElement[] {
    return Array.from(hostElement.querySelectorAll(tag));
  }

  private _changeElementToComponent(
    element: HTMLElement,
    component: Type<any>,
  ): void {
    try {
      const componentRef = this._getComponentReference(component);
      this._componentRefs.push(componentRef);
      if (!element.dataset) {
        return;
      }
      Object.keys(element.dataset).forEach((key) => {
        let value: any = element.dataset[key];
        if (value.startsWith('[') || value.startsWith('{')) {
          try {
            value = JSON.parse(value);
          } catch (e) {}
        }

        if (componentRef.instance[key] && componentRef.instance[key].set) {
          componentRef.instance[key].set(value);
        } else {
          componentRef.instance[key] = value;
        }
      });
      componentRef.instance?.initialize?.();
      element.parentElement!.replaceChild(
        this._getComponentElement(componentRef),
        element,
      );
    } catch (error) {
      console.error(
        `Error while inserting component: ${component.name}`,
        error,
      );
    }
  }

  private _getComponentReference<T>(component: Type<T>): ComponentRef<T> {
    return this._injector.get(ViewContainerRef).createComponent(component);
  }

  private _getComponentElement(componentRef: ComponentRef<any>): HTMLElement {
    componentRef.changeDetectorRef.markForCheck();
    return (componentRef.hostView as any).rootNodes[0] as HTMLElement;
  }

  private _logComponentInsertionError(tag: string, error: any): void {
    console.error(`Error while inserting component for tag "${tag}":`, error);
  }

  public dispose(): void {
    this._componentRefs.forEach((ref) => ref.destroy());
    this._componentRefs = [];
  }
}
