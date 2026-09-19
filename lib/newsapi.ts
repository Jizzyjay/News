import type {
  Article,
  EverythingQuery,
  HeadlineQuery,
  NewsApiError,
  NewsApiSuccess,
  Publisher,
  SourcesQuery,
  SourcesSuccess,
} from "./types";
import { articleFromPayload } from "./utils";

const API_BASE = "https://newsapi.org/v2";
const REVALIDATE_SECONDS = 300;

class NewsApiRequestError extends Error {
  code: string;

  constructor(message: string, code = "newsapiError") {
    super(message);
    this.code = code;
  }
}

function apiKey(): string {
  const key = process.env.NEWS_API_KEY;
  if (!key) {
    throw new NewsApiRequestError(
      "NEWS_API_KEY is missing. Add it to .env.local.",
      "apiKeyMissing",
    );
  }
  return key;
}

function toSearchParams(
  params: Record<string, string | number | undefined>,
): URLSearchParams {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    search.set(key, String(value));
  }
  search.set("apiKey", apiKey());
  return search;
}

async function newsGet<T extends NewsApiSuccess | SourcesSuccess>(
  path: string,
  params: Record<string, string | number | undefined>,
): Promise<T> {
  const url = `${API_BASE}${path}?${toSearchParams(params).toString()}`;
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS, tags: ["newsapi"] },
  });

  let payload: T | NewsApiError;
  try {
    payload = (await response.json()) as T | NewsApiError;
  } catch {
    throw new NewsApiRequestError(
      `NewsAPI returned a non-JSON response (${response.status}).`,
      "invalidResponse",
    );
  }

  if (payload.status === "error") {
    throw new NewsApiRequestError(payload.message, payload.code);
  }

  if (!response.ok) {
    throw new NewsApiRequestError(
      `NewsAPI request failed with HTTP ${response.status}.`,
      "httpError",
    );
  }

  return payload;
}

export async function getTopHeadlines(query: HeadlineQuery = {}) {
  const data = await newsGet<NewsApiSuccess>("/top-headlines", {
    country: query.sources ? undefined : query.country ?? "us",
    category: query.category,
    sources: query.sources,
    q: query.q,
    pageSize: query.pageSize ?? 40,
    page: query.page ?? 1,
  });

  return {
    totalResults: data.totalResults,
    articles: usableArticles(data.articles),
  };
}

export async function getEverything(query: EverythingQuery) {
  const data = await newsGet<NewsApiSuccess>("/everything", {
    q: query.q,
    sources: query.sources,
    domains: query.domains,
    language: query.language ?? "en",
    sortBy: query.sortBy ?? "publishedAt",
    from: query.from,
    to: query.to,
    pageSize: query.pageSize ?? 20,
    page: query.page ?? 1,
  });

  return {
    totalResults: data.totalResults,
    articles: usableArticles(data.articles),
  };
}

export async function getSources(query: SourcesQuery = {}) {
  const data = await newsGet<SourcesSuccess>("/sources", {
    category: query.category,
    language: query.language ?? "en",
    country: query.country,
  });

  return data.sources;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const embedded = articleFromPayload(id);
  if (embedded?.title && embedded.url && embedded.title !== embedded.url) {
    return embedded;
  }

  const url = embedded?.url;
  if (!url) return null;

  const pools = await Promise.allSettled([
    getTopHeadlines({ country: "us", pageSize: 100 }),
    getTopHeadlines({ category: "technology", pageSize: 50 }),
  ]);

  for (const pool of pools) {
    if (pool.status !== "fulfilled") continue;
    const match = pool.value.articles.find((article) => article.url === url);
    if (match) return match;
  }

  return embedded;
}

export async function safeTopHeadlines(query: HeadlineQuery = {}) {
  try {
    const data = await getTopHeadlines(query);
    return { ...data, error: null as string | null };
  } catch (error) {
    return emptyFeed(error);
  }
}

export async function safeEverything(query: EverythingQuery) {
  try {
    const data = await getEverything(query);
    return { ...data, error: null as string | null };
  } catch (error) {
    return emptyFeed(error);
  }
}

export async function safeSources(query: SourcesQuery = {}) {
  try {
    return { sources: await getSources(query), error: null as string | null };
  } catch (error) {
    return {
      sources: [] as Publisher[],
      error: error instanceof Error ? error.message : "Unable to load sources.",
    };
  }
}

function usableArticles(articles: Article[]): Article[] {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (!article.title || article.title === "[Removed]") return false;
    if (!article.url || seen.has(article.url)) return false;
    seen.add(article.url);
    return true;
  });
}

function emptyFeed(error: unknown) {
  return {
    totalResults: 0,
    articles: [] as Article[],
    error: error instanceof Error ? error.message : "NewsAPI request failed.",
  };
}

export { NewsApiRequestError };
