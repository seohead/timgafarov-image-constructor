export const proxyImageUrl = (url: string): string => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === '5na5.ru') {
      return `/proxy${urlObj.pathname}`;
    }
    return url;
  } catch (e) {
    return url;
  }
};

export const preloadImage = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = proxyImageUrl(url);
  });
};