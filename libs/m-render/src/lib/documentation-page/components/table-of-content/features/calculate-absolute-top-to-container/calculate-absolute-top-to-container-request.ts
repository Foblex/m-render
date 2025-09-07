export class CalculateAbsoluteTopToContainerRequest {
  public static requestToken = Symbol('CalculateAbsoluteTopToContainerRequest');

  constructor(
    public element: HTMLElement,
  ) {
  }
}
