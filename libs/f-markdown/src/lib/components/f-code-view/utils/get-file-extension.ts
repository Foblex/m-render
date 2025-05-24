export function getFileExtension(url: string): string {
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
