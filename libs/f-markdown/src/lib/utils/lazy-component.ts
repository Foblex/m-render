import { Type } from '@angular/core';

/**
 * Lazy loads a component from a module.
 */
export function lazyComponent<T>(loader: () => Promise<Record<string, unknown>>): Promise<Type<T>> {
  return loader().then(module => {
    const component = Object.values(module).find(
      (value): value is Type<T> => typeof value === 'function',
    );
    if (!component) {
      throw new Error('Component not found');
    }

    return component;
  });
}
