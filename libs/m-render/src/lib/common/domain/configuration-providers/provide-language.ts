export function provideLanguage(lang: string): ILanguageConfiguration {
  return {
    lang,
  };
}

export interface ILanguageConfiguration {
  lang: string;
}
