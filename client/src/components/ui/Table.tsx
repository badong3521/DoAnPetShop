import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
  PaginationState,
  SortingState,
  Column,
} from "@tanstack/react-table";
import { EmptyContent } from "./EmptyContent";
import { ScrollArea } from "./ScrollArea";
import { AsynchronousContent } from "@components/AsynchronousContent";
import { QueryStatus } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { ArrowLeft, ArrowLineLeft, ArrowLineRight, ArrowRight, Icon } from "phosphor-react";
import { SortColumnButton } from "@components/SortColumnButton";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  asyncStatus?: QueryStatus;
  idPath?: string;

  pagination?: {
    state: PaginationState;
    setState: Dispatch<SetStateAction<PaginationState>>;
  };
  lastPage?: number;

  sorting?: {
    state: SortingState;
    setState: Dispatch<SetStateAction<SortingState>>;
  };

  isFetchingWithPreviousData?: boolean; // there is previous data that can continue being rendered while fetching new
};

export function Table<T>({
  data,
  columns,
  asyncStatus = "success",
  idPath,
  pagination,
  lastPage,
  sorting,
  isFetchingWithPreviousData,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: pagination?.state,
      sorting: sorting?.state,
    },
    onPaginationChange: pagination?.setState,
    pageCount: lastPage,
    manualPagination: true,
    onSortingChange: sorting?.setState,
    getCoreRowModel: getCoreRowModel(),

    getRowId(originalRow: any) {
      // For better consistency, use the unique ID from the data and not the one generated by ReactTable.
      // Sometimes this ID property has a different name (e.g. 'user_id') or it's in a nested object, like user_data: {id: '...'}
      // In these cases, just pass the prop idPath, with the path to the desired ID.
      if (!idPath) {
        if (originalRow.id) return originalRow.id;
        throw new Error(`All rows from data needs an unique 'id'`);
      }

      const properties = idPath.split(".");
      let currentObj = { ...originalRow };

      for (const property of properties) {
        currentObj = currentObj[property];
      }

      if (currentObj) return currentObj;

      throw new Error(`All rows from data needs an unique 'id'`);
    },
  });

  const hasItems = data.length > 0;

  function handleToggleSorting(column: Column<any, unknown>) {
    // NOT SORTING --> SORT ASC --> SORT DESC --> NOT SORTING

    if (column.getIsSorted() === false) {
      column.toggleSorting(false);
    } else if (column.getIsSorted() === "asc") {
      column.toggleSorting(true);
    } else if (column.getIsSorted() === "desc") {
      column.clearSorting();
    }
  }

  return (
    <AsynchronousContent status={asyncStatus}>
      <ScrollArea>
        <div className={`max-h-screen-3/5 ${isFetchingWithPreviousData ? "animate-pulse" : ""}`}>
          <table className="table">
            {hasItems && (
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        <div className="flex items-center gap-1">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}

                          {header.column.columnDef.enableSorting && (
                            <SortColumnButton
                              sortingOrder={header.column.getIsSorted()}
                              onClick={() => handleToggleSorting(header.column)}
                            />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            )}
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}

              {!hasItems && (
                <tr>
                  <td>
                    <EmptyContent />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ScrollArea>

      {pagination !== undefined && (
        <div className="flex items-center gap-4 justify-end mt-4">
          <div className="flex items-center gap-1">
            <label htmlFor="page-size">Itens por página</label>
            <select
              id="page-size"
              className="select select-bordered select-xs"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 15, 30, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <span className="flex items-center gap-1">
            <strong>
              {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </strong>
          </span>

          <div className="flex items-center gap-1">
            <PaginationButton
              icon={ArrowLineLeft}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            />
            <PaginationButton
              icon={ArrowLeft}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
            <PaginationButton icon={ArrowRight} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
            <PaginationButton
              icon={ArrowLineRight}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            />
          </div>
        </div>
      )}
    </AsynchronousContent>
  );
}

type PaginationButtonProps = {
  icon: Icon;
  onClick: () => void;
  disabled: boolean;
};
const PaginationButton = ({ icon: Icon, ...props }: PaginationButtonProps) => (
  <button {...props} className="btn btn-circle btn-ghost disabled:bg-transparent">
    <Icon size={20} weight="fill" />
  </button>
);
