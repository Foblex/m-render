import { IDocumentationConfiguration } from '../i-documentation-configuration';
import { Type } from '@angular/core';
import { IExampleComponent } from '../../components';

export function defineLazyComponent(
  selector: string,
  loader: () => Promise<Record<string, unknown>>,
): IExampleComponent {
  return {
    selector,
    component: extractComponent(loader),
  };
}

export function provideComponents(components: IExampleComponent[]): Partial<IDocumentationConfiguration> {
  return {
    components,
  };
}

export function extractComponent(loader: () => Promise<Record<string, unknown>>): Promise<Type<any>> {
  return loader().then(module => {
    const component = Object.values(module).find(
      (v): v is Type<any> => typeof v === 'function' && Object.prototype.hasOwnProperty.call(v, 'ɵcmp'),
    );
    if (!component) {
      throw new Error('Component not found');
    }
    return component;
  });
}
