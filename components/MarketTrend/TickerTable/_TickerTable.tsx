'use client'

import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { IoIosStarOutline, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import Link from 'next/link';

function TickerTable({ data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'star',
        Cell: () => <IoIosStarOutline size={15} />,
      },
      {
        Header: 'Ranking',
        accessor: 'rank',
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
      },
      {
        Header: 'Price',
        accessor: 'day.c',
      },
      {
        Header: 'Change',
        accessor: 'todaysChange',
      },
      {
        Header: '% Change',
        accessor: 'todaysChangePerc',
      },
      {
        Header: 'Volume',
        accessor: 'day.v',
      },
      {
        Header: 'Market Cap',
        accessor: 'marketCap',
      },
      {
        Header: '50-Day SMA',
        accessor: 'sma50',
      },
      {
        Header: '200-Day SMA',
        accessor: 'sma200',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: Math.ceil(data.length / pageSize),
    },
    useSortBy,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllPageRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => null,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <Link href={`/ticker/${row.original.symbol}`}>
              <a>
                <IoIosStarOutline size={15} />
              </a>
            </Link>
          ),
        },
        ...columns,
      ]);
    }
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    setPageSize(pageSize);
  }, [pageSize, pageIndex, setPageSize]);

  return (
    <>
      <div {...getTableProps()} className="min-w-[1300px]">
        <div className="sticky top-0 z-10 bg-white shadow">
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="flex">
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? <IoMdArrowDropdown /> : <IoMdArrowDropup />) : ''}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map(cell => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'Previous'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'Next'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>{' '}
        </span>
      </div>
    </>
  );
}

export default TickerTable;
