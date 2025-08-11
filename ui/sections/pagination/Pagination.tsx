'use client';

import { LinkButton } from "@/ui/components";
import styles from "./pagination.module.scss";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

function Pagination({
  totalPages = 0,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generatePages = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = generatePages(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <LinkButton
        href={createPageURL(1)}
        primary={false}
        leadIconUrl="/icons/chevrons-left.svg"
      />
      <LinkButton
        href={createPageURL(currentPage - 1)}
        primary={false}
        leadIconUrl="/icons/chevron-left.svg"
      />
      {pages.map((page, index) => (
        <LinkButton
          key={index}
          href={createPageURL(page)}
          label={page.toString()}
          disabled={typeof page === "string"}
          primary={page === currentPage}
        />
      ))}
      <LinkButton
        href={createPageURL(currentPage + 1)}
        primary={false}
        leadIconUrl="/icons/chevron-right.svg"
      />
      <LinkButton
        href={createPageURL(totalPages)}
        primary={false}
        leadIconUrl="/icons/chevrons-right.svg"
      />
    </div>
  );
}

export default Pagination;
