export function provideTitle(title: string): ITitleConfiguration {
  return {
    title,
  };
}

export interface ITitleConfiguration {
  title: string;
}
