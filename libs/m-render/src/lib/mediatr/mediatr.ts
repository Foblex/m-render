import { inject, Injectable, Injector, Type } from '@angular/core';
import { IExecution } from './i-execution';

@Injectable({
  providedIn: 'root',
})
export class Mediatr {
  private readonly _injector = inject(Injector);

  private static _executions = new Map<symbol, Type<IExecution<any, any>>>();

  public static register<TRequest, TResponse>(
    type: {
      fToken: symbol;
    }, handler: Type<IExecution<TRequest, TResponse>>,
  ): void {

    if (!type?.fToken) {
      throw new Error('Type must have static fToken');
    }
    Mediatr._executions.set(type?.fToken, handler);
  }

  public execute<TResponse>(request: any): TResponse {
    const token = request.constructor.fToken;

    const handlerType = Mediatr._executions.get(token);
    if (!handlerType) {
      throw new Error(`No handler registered for token`, token);
    }

    const handler = this._injector.get(handlerType);
    return handler.handle(request);
  }
}
