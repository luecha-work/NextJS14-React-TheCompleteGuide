import { NewsItem } from "@/models/news-item";
import sql from "better-sqlite3";

const db = sql("data.db");

export async function getAllNews(): Promise<NewsItem[]> {
  const news: NewsItem[] = db.prepare("SELECT * FROM news").all() as NewsItem[];
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

export async function getNewsItem(slug: string): Promise<NewsItem | undefined> {
  const newsItem: NewsItem | undefined = db
    .prepare("SELECT * FROM news WHERE slug = ?")
    .get(slug) as NewsItem;
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return newsItem;
}

export async function getLatestNews(): Promise<NewsItem[]> {
  const latestNews: NewsItem[] = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all() as NewsItem[];
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return latestNews;
}

export async function getAvailableNewsYears(): Promise<string[]> {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all() as { year: string }[]; // ใช้ type assertion เพื่อระบุประเภท

  const yearList = years.map((year) => year.year);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return yearList;
}

export function getAvailableNewsMonths(year: number): string[] {
  const months = db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year) as { month: string }[]; // ใช้ type assertion เพื่อระบุประเภท

  const monthList = months.map((month) => month.month);

  return monthList;
}

export async function getNewsForYear(year: number): Promise<NewsItem[]> {
  const news: NewsItem[] = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year) as NewsItem[];
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

export async function getNewsForYearAndMonth(
  year: number,
  month: number
): Promise<NewsItem[]> {
  const news: NewsItem[] = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month) as NewsItem[];
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}
