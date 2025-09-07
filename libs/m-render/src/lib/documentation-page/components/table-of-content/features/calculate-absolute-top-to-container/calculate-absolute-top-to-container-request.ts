export class CalculateAbsoluteTopToContainerRequest {
  public static fToken = Symbol('CalculateAbsoluteTopToContainerRequest');

  constructor(
    public element: HTMLElement,
  ) {
  }
}
