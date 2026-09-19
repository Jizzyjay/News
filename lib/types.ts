export interface NewsSourceRef {
  id: string | null;
  name: string;
}

export interface Article {
  source: NewsSourceRef;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiSuccess {
  status: "ok";
  totalResults: number;
  articles: Article[];
}

export interface NewsApiError {
  status: "error";
  code: string;
  message: string;
}

export type NewsApiResponse = NewsApiSuccess | NewsApiError;

export interface Publisher {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface SourcesSuccess {
  status: "ok";
  sources: Publisher[];
}

export type SourcesResponse = SourcesSuccess | NewsApiError;

export type HeadlineCategory =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

export type SortBy = "publishedAt" | "relevancy" | "popularity";

export interface HeadlineQuery {
  country?: string;
  category?: HeadlineCategory;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}

export interface EverythingQuery {
  q: string;
  sources?: string;
  domains?: string;
  language?: string;
  sortBy?: SortBy;
  from?: string;
  to?: string;
  pageSize?: number;
  page?: number;
}

export interface SourcesQuery {
  category?: HeadlineCategory;
  language?: string;
  country?: string;
}
