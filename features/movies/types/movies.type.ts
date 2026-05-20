export interface Movie {
  id: string;
  title: string;
  year?: number;
  runtime?: number;
  genres?: string[];
  version: number;
}
