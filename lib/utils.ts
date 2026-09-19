import type { Article } from "./types";

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function toBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function articlePath(article: Article): string {
  const payload = JSON.stringify({
    u: article.url,
    t: article.title,
    d: article.description,
    i: article.urlToImage,
    s: article.source,
    a: article.author,
    p: article.publishedAt,
    c: article.content,
  });
  return `/article/${encodeURIComponent(toBase64Url(payload))}`;
}

export function articleFromPayload(id: string): Article | null {
  try {
    const raw = fromBase64Url(decodeURIComponent(id));
    if (raw.startsWith("{")) {
      const parsed = JSON.parse(raw) as {
        u: string;
        t: string;
        d: string | null;
        i: string | null;
        s: Article["source"];
        a: string | null;
        p: string;
        c: string | null;
      };
      return {
        url: parsed.u,
        title: parsed.t,
        description: parsed.d,
        urlToImage: parsed.i,
        source: parsed.s,
        author: parsed.a,
        publishedAt: parsed.p,
        content: parsed.c,
      };
    }
    return {
      source: { id: null, name: hostnameOf(raw) },
      author: null,
      title: raw,
      description: null,
      url: raw,
      urlToImage: null,
      publishedAt: new Date().toISOString(),
      content: null,
    };
  } catch {
    return null;
  }
}

export function formatRelativeTime(isoDate: string, now = new Date()): string {
  const then = new Date(isoDate);
  if (Number.isNaN(then.getTime())) return "Unknown";

  const seconds = Math.max(0, Math.floor((now.getTime() - then.getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return then.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatEditionStamp(date = new Date()): string {
  return date
    .toLocaleString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    })
    .toUpperCase();
}

export function estimateReadMinutes(article: Article): number {
  const text = `${article.title} ${article.description ?? ""} ${article.content ?? ""}`;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

export function sourceLabel(article: Article): string {
  return article.source.name?.trim() || "Unknown Wire";
}

export function authorLabel(article: Article): string {
  if (!article.author) return "NewsAPI Wire Desk";
  const cleaned = article.author.replace(/^https?:\/\/\S+/i, "").trim();
  return cleaned || "NewsAPI Wire Desk";
}

export function takeaways(article: Article): string[] {
  const pool = [article.description, article.content]
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .replace(/\s*\[\+\d+\s+chars\]\s*$/i, "")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 40);

  return pool.slice(0, 3);
}

export function uniqueSources(articles: Article[]): string[] {
  return [
    ...new Set(articles.map((article) => sourceLabel(article)).filter(Boolean)),
  ];
}

export function isUsableImage(url: string | null): url is string {
  if (!url) return false;
  if (url.includes("placeholder")) return false;
  return /^https?:\/\//i.test(url);
}

export function initials(name: string): string {
  const parts = name.replace(/https?:\/\/\S+/g, "").split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "DN";
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function stripTruncation(content: string | null): string {
  if (!content) return "";
  return content.replace(/\s*\[\+\d+\s+chars\]\s*$/i, "").trim();
}

export function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
