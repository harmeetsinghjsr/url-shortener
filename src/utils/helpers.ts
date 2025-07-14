export const generateShortCode = (): string => {
  return Math.random().toString(36).substring(2, 8);
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isAlphanumeric = (str: string): boolean => /^[a-z0-9]+$/i.test(str);