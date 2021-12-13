import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { DOTS, usePagination } from "../hooks/usePagination";

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage?: number;
  pageSize?: number;
};

export default function Pagination({
  onPageChange,
  totalCount,
  pageSize = 9,
  siblingCount = 1,
  currentPage = 1,
}: PaginationProps) {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ButtonGroup isAttached>
      <IconButton
        aria-label="left-arrow"
        icon={<ChevronLeftIcon />}
        disabled={currentPage === 1}
        variant="outline"
        colorScheme="blue"
        onClick={onPrevious}
      />
      {paginationRange.map((page, idx) =>
        page === DOTS ? (
          <Button key={idx} disabled>
            {"…"}
          </Button>
        ) : (
          <Button
            key={idx}
            colorScheme={page === currentPage ? "blue" : undefined}
            onClick={() => page !== currentPage && onPageChange(page)}
          >
            {page}
          </Button>
        )
      )}
      <IconButton
        aria-label="right-arrow"
        icon={<ChevronRightIcon />}
        disabled={currentPage === lastPage}
        variant="outline"
        colorScheme="blue"
        onClick={onNext}
      />
    </ButtonGroup>
  );
}
