export class ScrollToElementInContainerRequest {
  public static requestToken = Symbol('ScrollToElementInContainerRequest');

  constructor(public hash: string) {
  }
}
