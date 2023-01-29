import { BaseComponent, Dataset } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnWithLooseAccessor,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { BsCaretUp } from "react-icons/bs";
import { SelectBox } from "../inputs";

interface ReactTableProps extends BaseComponent {
  data: Dataset;
  index?: string;
  pagination?: boolean;
}

export function ReactTable({
  data,
  index,
  pagination,
  className,
}: ReactTableProps) {
  if (!data || data.length < 1) {
    return null;
  }

  const tableData = useMemo<Dataset>(() => data, [data]);
  const tableColumns = useMemo<ColumnWithLooseAccessor[]>(
    () =>
      Object.keys(data[0]).map((key) => ({
        Header: key === index ? "" : key,
        accessor: key,
      })),
    [data]
  );
  const colOptions = tableColumns.map((cols) => cols.accessor as string);

  const {
    // Base
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    // For search/filter
    setFilter,

    // For pagination
    page,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const body = pagination ? page : rows;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(pageSize);
  const [filterText, setFilterText] = useState<string>("");
  const [filterColumn, setFilterColumn] = useState<string>(colOptions[0]);

  const handlePageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value < 0) {
      setCurrentSize(0);
    } else if (value > rows.length) {
      setCurrentSize(rows.length);
    } else {
      setCurrentSize(value);
    }
  };

  const handlePageChange = (
    e: React.ChangeEvent<HTMLInputElement> | undefined,
    type: "prev" | "next" | undefined = undefined
  ) => {
    const value = e
      ? Number(e.target.value)
      : type === "prev"
      ? currentPage - 1
      : type === "next"
      ? currentPage + 1
      : 1;

    if (type === "prev" && value === 0) {
      setCurrentPage(1);
      return;
    }

    if (value < 0) {
      setCurrentPage(0);
    } else if (value > pageCount) {
      setCurrentPage(pageCount);
    } else {
      setCurrentPage(value);
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setFilter(filterColumn, text);
    setFilterText(text);
  };

  useEffect(() => {
    if (currentSize > 0) {
      setPageSize(currentSize);
    }
  }, [currentSize]);

  useEffect(() => {
    gotoPage(currentPage - 1);
  }, [currentPage]);

  return (
    <div className="grid">
      {pagination && (
        <div
          className="flex flex-col lg:flex-row gap-2 p-2 text-sm
        items-center justify-between border-b-2 bg-white dark:bg-black"
        >
          <div className="flex justify-center items-center">
            Show{" "}
            <input
              type="number"
              className="flex w-8 mx-1 px-1 text-black border border-black outline-none"
              value={currentSize.toFixed()}
              onChange={(e) => handlePageSize(e)}
            />{" "}
            entries per page
          </div>
          <div className="flex">
            <div className="flex items-center gap-1">
              <label>Search </label>
              <SelectBox
                value={filterColumn}
                setValue={setFilterColumn}
                options={colOptions}
              />
            </div>
            <input
              type="text"
              className="px-1 text-black border border-black outline-none"
              value={filterText}
              onChange={(e) => handleFilter(e)}
            />
          </div>
        </div>
      )}

      <div className={`flex overflow-auto ${className}`}>
        <table {...getTableProps()} className="table table-auto w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`px-2 py-2 font-bold border-b-4 border-decor-primary
                   bg-white dark:bg-black ${column.isSorted && "pr-4"}`}
                  >
                    {column.render("Header")}
                    <span className="flex place-content-center text-sm">
                      {column.isSorted && (
                        <BsCaretUp
                          className={`duration-300 ${
                            column.isSortedDesc && "rotate-180"
                          }`}
                        />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {body.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-2 py-1 whitespace-nowrap border-b bg-white dark:bg-black"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex flex-col lg:flex-row gap-2 justify-between items-center text-sm p-2 border-t-2 bg-white dark:bg-black">
          <span>
            Showing {(pageIndex + 1) * pageSize - pageSize + 1} to{" "}
            {(pageIndex + 1) * pageSize} of {rows.length} entries
          </span>

          <div className="flex gap-2">
            <button
              className={pageButtonStyle}
              onClick={() => handlePageChange(undefined, "prev")}
            >
              <BsCaretUp className="-rotate-90" />
            </button>
            <div className="flex justify-center items-center">
              Page{" "}
              <input
                type="number"
                className="flex w-8 mx-1 px-1 text-black border border-black outline-none"
                value={currentPage.toFixed()}
                onChange={(e) => handlePageChange(e)}
              />{" "}
              of {pageCount}
            </div>
            <button
              className={pageButtonStyle}
              onClick={() => handlePageChange(undefined, "next")}
            >
              <BsCaretUp className="rotate-90" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const pageButtonStyle = "flex justify-center items-center text-xl";
