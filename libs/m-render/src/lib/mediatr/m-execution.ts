import { IExecution } from './i-execution';
import { Mediatr } from './mediatr';

type Constructor<T = any> = new (...args: any[]) => T;

export function MExecution<TRequest, TResponse>(requestType: {
  fToken: symbol;
}) {
  return function (constructor: Constructor<IExecution<TRequest, TResponse>>) {
    Mediatr.register(requestType, constructor);
  };
}
