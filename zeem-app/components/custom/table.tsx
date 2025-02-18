"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, SetStateAction, useState } from "react";
// import { TablePagination } from "../table-pagination";
// import { Pagination } from "@/types/response";
import { useRouter } from "next/navigation";
import NoData from "./no-data";
import { TablePagination } from "./pagination";
// import NoData from "../no-data";

interface TableRowData {
  [key: string]: string | number | boolean | React.ReactNode;
}

interface TableProp {
  tableHead: string[];
  tableBody: TableRowData[];
  setPage?: Dispatch<SetStateAction<number>>;
  emptyState?: React.ReactNode;
  handleChecked?: Dispatch<SetStateAction<string[]>>;
}

export function CustomTable({
  tableHead,
  tableBody,
  //   setPage,
  emptyState,
}: TableProp) {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const perPage = 10;
  const start = (page - 1) * perPage;
  const end = page * perPage;

  const tableBodyData = tableBody.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
    );
  });

  const handleClick = (link: string) => {
    if (link) router.push(link);
  };

  return tableBodyData && tableBodyData.length > 0 ? (
    <>
      <Table className="my-6">
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            {tableHead.map((head, index) => (
              <TableHead className="capitalize" key={index}>
                {head.toLowerCase() === "action" ? (
                  <div className="flex gap-2 items-center">{head}</div>
                ) : (
                  <div className="flex gap-2 justify-between items-center cursor-pointer">
                    {head}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableBodyData.slice(start, end).map((body, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{start + i + 1}</TableCell>
              {tableHead.map((header) =>
                header.toLowerCase() === "action" ? (
                  <TableCell key={header} className="font-medium">
                    {body[header.toLowerCase()]}
                  </TableCell>
                ) : body["link"] ? (
                  <TableCell
                    key={header}
                    className="font-medium min-w-[160px] cursor-pointer"
                    onClick={() => handleClick(String(body["link"]))}
                  >
                    {body[header.toLowerCase()]}
                  </TableCell>
                ) : (
                  <TableCell key={header} className="font-medium min-w-[160px]">
                    {body[header.toLowerCase()]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {
        <TablePagination
          data={tableBody}
          page={page}
          setPage={setPage}
          perPage={perPage}
        />
      }
    </>
  ) : emptyState ? (
    <div className="my-">{emptyState}</div>
  ) : (
    <NoData />
  );
}
