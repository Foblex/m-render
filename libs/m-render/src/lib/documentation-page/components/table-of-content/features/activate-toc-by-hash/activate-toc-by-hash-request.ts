export class ActivateTocByHashRequest {
  public static requestToken = Symbol('ActivateTocByHashRequest');

  constructor(
    public hash: string | undefined,
  ) {
  }
}
