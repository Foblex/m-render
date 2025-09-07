export class CalculateTableOfContentRequest {
  public static requestToken = Symbol('CalculateTableOfContentRequest');

  constructor(
    public readonly hostElement: HTMLElement,
  ) {
  }
}
