export function provideLogo(logo: string): ILogoConfiguration {
  return {
    logo,
  };
}

export interface ILogoConfiguration {
  logo: string;
}
