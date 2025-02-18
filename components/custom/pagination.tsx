"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TableData {
  [key: string]: string | number | boolean | React.ReactNode;
}

interface Props {
  page: number;
  perPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: TableData[];
}

export function TablePagination({ page, setPage, data, perPage }: Props) {
  const paginateData = Array.from(
    { length: Math.ceil(data.length / perPage) },
    (_, i) => i + 1
  );

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < paginateData.length) setPage(page + 1);
  };

  const handlePageClick = (page: number) => {
    setPage(page);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="icon" onClick={handlePrev}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {paginateData?.map((e, i) => (
        <Button
          variant="outline"
          className={`${e === page ? "bg-gray-800 text-white" : ""}`}
          size="sm"
          key={i}
          onClick={() => handlePageClick(e)}
        >
          {e}
        </Button>
      ))}

      <Button variant="outline" size="icon" onClick={handleNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
