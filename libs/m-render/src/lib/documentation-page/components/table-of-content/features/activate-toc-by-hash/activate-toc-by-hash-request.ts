export class ActivateTocByHashRequest {
  public static fToken = Symbol('ActivateTocByHashRequest');

  constructor(
    public hash: string | undefined,
  ) {
  }
}
