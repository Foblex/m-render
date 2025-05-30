export function parseLanguageFromFileExtension(url: string): string {
  const match = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);

  if (match) {
    let extension = match[1];
    if (extension === 'css') {
      extension = 'scss';
    }
    return extension;
  }
  return '';
}

export const LANGUAGES = [
  'javascript',
  'typescript',
  'angular-html',
  'angular-ts',
  'shell',
  'html',
  'bash',
  'css',
  'scss',
  'markdown',
  'text',
];

export function parseSyntaxLanguage(language: string): string {
  let result: string;
  switch (language) {
    case 'js':
    case 'javascript':
      result = 'javascript';
      break;
    case 'ts':
    case 'typescript':
    case 'angular-ts':
      result = 'angular-ts';
      break;
    case 'html':
    case 'angular-html':
      result = 'angular-html';
      break;
    default:
      result = extractLanguage(language);
  }
  if(!LANGUAGES.includes(result)) {
    result = 'text';
  }
  return result;
}

function extractLanguage(language: string): string {
  const match = language.match(/^([^\s\[]+)/);
  return match ? match[1].toLowerCase() : language;
}
