type UrlEntry = {
  longURL: string;
  expiry: Date;
  hits: number;
};

export const urlMap = new Map<string, UrlEntry>();