export const add = (a: number, b: number) => a + b;

export const getImageUrl = function (url: string) {
  return new URL(url, import.meta.url).href;
};
