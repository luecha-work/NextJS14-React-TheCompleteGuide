import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

interface FilteredNewPageProps {
  readonly params: {
    filter: any;
  };
}

async function FilterHeader({
  year,
  month,
}: {
  readonly year: number;
  readonly month: number;
}) {
  const availableNewsYears = await getAvailableNewsYears();
  let links = availableNewsYears;

  if (
    (year && !availableNewsYears.includes(year.toString())) ||
    (month && !getAvailableNewsMonths(year).includes(month.toString()))
  ) {
    throw new Error("Invalid filter.");
  }

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;

            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({
  year,
  month,
}: {
  readonly year: number;
  readonly month: number;
}) {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
}

async function FilteredNewPage({ params }: FilteredNewPageProps) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMount = filter?.[1];

  return (
    <>
      {/* <Suspense fallback={<p>Loading filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMount} />
      </Suspense> */}
      <Suspense fallback={<p>Loading news...</p>}>
        <FilterHeader year={selectedYear} month={selectedMount} />
        <FilteredNews year={selectedYear} month={selectedMount} />
      </Suspense>
    </>
  );
}

export default FilteredNewPage;
