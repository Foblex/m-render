export class CalculateTableOfContentRequest {
  public static fToken = Symbol('CalculateTableOfContentRequest');

  constructor(
    public readonly hostElement: HTMLElement,
  ) {
  }
}
