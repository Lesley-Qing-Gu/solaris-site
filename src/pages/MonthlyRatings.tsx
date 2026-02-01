import { useState, useMemo, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import FilterSelect from "@/components/ui/FilterSelect";
import { solarisRatings } from "@/data/solarisRatings";
import { monthlyData } from "@/data/monthlyData";

/* ---------- types ---------- */

interface Rating {
  film: string;
  director: string;
  year: number;
  rating: string;
  note: string;
  image: string;
}

interface RatingWithMonth extends Rating {
  month: string;
  monthNum: number;
  yearGroup: number;
}

type SortMode = "none" | "rating" | "title" | "director" | "year";

/* ---------- constants ---------- */

const PAGE_SIZE = 30;

const normalizeTitle = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/* ========================================================= */

const MonthlyRatings = () => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("none");
  const [page, setPage] = useState(1);

  /* ---------- filter options ---------- */

  const getRatingValue = (rating: string) => {
    if (!rating || rating === "TBA") return -1;
    return parseFloat(rating);
  };

  const years = useMemo(() => {
    const uniqueYears = [...new Set(monthlyData.map((m) => m.year))].sort(
      (a, b) => b - a
    );
    return [
      { value: "all", label: "All Years" },
      ...uniqueYears.map((y) => ({
        value: String(y),
        label: String(y),
      })),
    ];
  }, []);

  const months = [
    { value: "all", label: "All Months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  /* ---------- filter months ---------- */

  const filteredMonths = useMemo(() => {
    return monthlyData.filter((m) => {
      const yearMatch =
        selectedYear === "all" || m.year === Number(selectedYear);
      const monthMatch =
        selectedMonth === "all" || m.monthNum === Number(selectedMonth);
      return yearMatch && monthMatch;
    });
  }, [selectedYear, selectedMonth]);

  /* ---------- reset page ---------- */

  useEffect(() => {
    setPage(1);
  }, [selectedYear, selectedMonth, sortMode]);

  /* ---------- helpers ---------- */

  const applySolarisRating = (r: Rating): Rating => {
    const solarisScore = solarisRatings[normalizeTitle(r.film)];
    if (!solarisScore) return r;
    if (r.rating === "TBA") return { ...r, rating: solarisScore };
    return r;
  };

  const sortRatings = (ratings: RatingWithMonth[]) => {
    // ⭐ none = 数据库顺序（不 sort）
    if (sortMode === "none") {
      return ratings;
    }

    const copied = [...ratings];

    return copied.sort((a, b) => {
      // ① 年月主干（新 → 旧）
      if (a.yearGroup !== b.yearGroup) {
        return b.yearGroup - a.yearGroup;
      }

      if (a.monthNum !== b.monthNum) {
        return b.monthNum - a.monthNum;
      }

      // ② 同月内排序
      switch (sortMode) {
        case "title":
          return a.film.localeCompare(b.film, "en", { sensitivity: "base" });

        case "director":
          return a.director.localeCompare(b.director, "en", {
            sensitivity: "base",
          });

        case "year":
          return b.year - a.year;

        case "rating":
        default: {
          const ra = a.rating === "TBA" ? -1 : parseFloat(a.rating);
          const rb = b.rating === "TBA" ? -1 : parseFloat(b.rating);
          return rb - ra;
        }
      }
    });
  };

  /* ---------- flatten → sort → paginate ---------- */

  const allRatings: RatingWithMonth[] = useMemo(() => {
    return filteredMonths.flatMap((month) =>
      month.ratings.map((r) => ({
        ...applySolarisRating(r),
        month: month.month,
        monthNum: month.monthNum,
        yearGroup: month.year,
      }))
    );
  }, [filteredMonths]);

  const sortedRatings = useMemo(() => {
    return sortRatings(allRatings);
  }, [allRatings, sortMode]);

  const totalPages = Math.ceil(sortedRatings.length / PAGE_SIZE);

  const pagedRatings = sortedRatings.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ---------- group for rendering ---------- */

  const groupedRatings = useMemo(() => {
    const map = new Map<string, RatingWithMonth[]>();

    pagedRatings.forEach((r) => {
      const key = `${r.yearGroup}-${r.monthNum}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    });

    return Array.from(map.entries())
      .map(([key, ratings]) => {
        const [year, monthNum] = key.split("-");
        return {
          year: Number(year),
          monthNum: Number(monthNum),
          month: ratings[0].month,
          ratings,
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.monthNum - a.monthNum;
      });
  }, [pagedRatings]);

  /* ---------- render ---------- */

  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl md:text-4xl mb-8">Monthly Ratings</h1>

        {/* 🔥 Control bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 pb-6 border-b border-border">
          {/* left: filters */}
          <div className="flex flex-wrap gap-6">
            <FilterSelect
              label="Year"
              value={selectedYear}
              options={years}
              onChange={setSelectedYear}
            />
            <FilterSelect
              label="Month"
              value={selectedMonth}
              options={months}
              onChange={setSelectedMonth}
            />
          </div>

          {/* right: ranking / sort */}
          <div className="flex gap-3 text-sm text-muted-foreground">
            <SortText
              active={sortMode === "rating"}
              onClick={() => setSortMode((prev) => (prev === "rating" ? "none" : "rating"))}
            >
              Rating
            </SortText>
            <SortText
              active={sortMode === "title"}
              onClick={() => setSortMode((prev) => (prev === "title" ? "none" : "title"))}
            >
              Title
            </SortText>
            <SortText
              active={sortMode === "director"}
              onClick={() => setSortMode((prev) => (prev === "director" ? "none" : "director"))}
            >
              Director
            </SortText>
            <SortText
              active={sortMode === "year"}
              onClick={() => setSortMode((prev) => (prev === "year" ? "none" : "year"))}
            >
              Year
            </SortText>
          </div>
        </div>

        {groupedRatings.length === 0 ? (
          <p className="text-muted-foreground">
            No ratings found for this selection.
          </p>
        ) : (
          <>
            {groupedRatings.map((group) => (
              <section
                key={`${group.year}-${group.monthNum}`}
                className="mb-16"
              >
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
                  <h2 className="text-xl">
                    {group.month} {group.year}
                  </h2>
                </div>

                <div className="space-y-8">
                  {group.ratings.map((rating, i) => (
                    <div
                      key={`${rating.film}-${rating.year}-${i}`}
                      className="grid md:grid-cols-[40px_80px_1fr_auto] gap-4 items-start"
                    >
                      <div className="text-sm text-muted-foreground tabular-nums">
                        {i + 1}
                      </div>

                      <img
                        src={rating.image}
                        alt={rating.film}
                        className="w-20 h-28 object-cover grayscale"
                      />

                      <div>
                        <h3 className="text-lg">
                          {rating.film}{" "}
                          <span className="text-muted-foreground">
                            ({rating.director}, {rating.year})
                          </span>
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {rating.note}
                        </p>
                      </div>

                      <div className="text-lg md:text-right nav-text font-medium">
                        {rating.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-12 text-sm">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="text-muted-foreground hover:text-white disabled:opacity-30"
                >
                  ← Previous
                </button>

                <span className="text-muted-foreground">
                  Page {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="text-muted-foreground hover:text-white disabled:opacity-30"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </PageContainer>
    </Layout>
  );
};

/* ---------- SortText ---------- */

interface SortTextProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const SortText = ({ children, active, onClick }: SortTextProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-sans text-sm font-normal transition ${
        active ? "text-white" : "text-muted-foreground hover:text-white"
      }`}
    >
      {children}
    </button>
  );
};

export default MonthlyRatings;
