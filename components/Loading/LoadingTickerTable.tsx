import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const LoadingSkeleton = ({ columnsCount = 1, rowsCount = 10 }) => {
    const renderSkeletonRow = (key) => (
        <TableRow key={key} className="border-b border-zinc-600">
          {Array.from({ length: columnsCount }).map((_, index) => (
            <TableCell key={index} className="h-12">
              <div className="bg-zinc-300 dark:bg-zinc-700 animate-pulse h-4 w-full rounded" />
            </TableCell>
          ))}
        </TableRow>
      );

  return (
    <div className="w-full overflow-x-auto">
      <Table className="border-b border-zinc-600">
        <TableHeader className="dark:bg-zinc-900 bg-zinc-200 h-14">
          <TableRow className="border-zinc-600">
          {Array.from({ length: columnsCount }).map((_, index) => (
              <TableHead key={index} className="text-right w-40">
                <div className="bg-zinc-300 dark:bg-zinc-700 animate-pulse h-4 w-full rounded" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowsCount }).map((_, index) => renderSkeletonRow(index))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoadingSkeleton;
