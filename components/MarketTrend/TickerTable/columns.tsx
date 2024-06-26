"use client";

import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/store/favortiesStore";
import { ColumnDef } from "@tanstack/react-table";
import {
  IoIosStarOutline,
  IoIosStar,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";

export type TrendingTicker = {
  symbol: string;
  price: number;
  change: number | string;
  todaysChangePerc: number | string;
  volume: number;
  marketCap: number | string;
  sma200: number | string;
  sma50: number | string;
};

const formatNumber = (value: number) => {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return value.toLocaleString();
  } else {
    return `${value.toFixed(2)}`;
  }
};

export const columns: ColumnDef<TrendingTicker>[] = [
  {
    accessorKey: "favorite",
    header: "Favorite",
    cell: ({ row }) => {
      const { favorites, toggleFavorite } = useFavoritesStore();
      const isFavorite = favorites.includes(row.original.symbol);

      const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) => {
        event.stopPropagation(); // Prevents the event from propagating further
        toggleFavorite(row.original.symbol);
      };

      return (
        <div
          className="flex justify-center hover:scale-125 w-12"
          onClick={handleClick}
        >
          {isFavorite ? (
            <IoIosStar size={16} />
          ) : (
            <IoIosStarOutline size={16} />
          )}
        </div>
      );
    },
  },
  // {
  //     accessorKey: 'ranking',
  //     header: 'Ranking',
  //     cell: ({ row, table }) => {
  //         const pageIndex = table.getState().pagination.pageIndex;
  //         const pageSize = table.getState().pagination.pageSize;
  //         const sortedData = table.getState().sortedData || []; // Make sure to handle cases where sortedData might be undefined or null
  //         const sortedIndex = sortedData.findIndex(item => item === row.original);
  //         const rank = sortedIndex !== -1 ? (sortedIndex + pageIndex * pageSize + 1) : (pageIndex * pageSize + row.index + 1);
  //         return <div>{rank}</div>;
  //     },
  // },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => {
      const symbol = row.getValue("symbol");
      return (
        <div className="font-bold text-left">
          {symbol !== undefined ? symbol?.toString() : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    sortDescFirst: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (column.getIsSorted() === undefined) {
              // If not sorted, sort in descending order first
              column.getSortingFn();
            } else {
              // Toggle sorting if already sorted
              column.toggleSorting();
            }
          }}
          className="text-right"
        >
          Price
          {column.getIsSorted() === "asc" ? (
            <IoMdArrowDropdown size={20} />
          ) : column.getIsSorted() === "desc" ? (
            <IoMdArrowDropup size={20} />
          ) : (
            <div className="w-5"></div>
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "change",
    sortDescFirst: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            // Toggle sorting, handle undefined state for initial sort direction
            column.toggleSorting(column.getIsSorted() ? undefined : true);
          }}
          className="text-right"
        >
          Change
          {column.getIsSorted() === "asc" ? (
            <IoMdArrowDropdown size={20} />
          ) : column.getIsSorted() === "desc" ? (
            <IoMdArrowDropup size={20} />
          ) : (
            <div className="w-5"></div>
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const change = parseFloat(row.getValue("change"));
      const formatted = change.toFixed(2);
      return (
        <div
          className={`text-right font-medium ${change >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {formatted}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const valA = parseFloat(rowA.getValue("change"));
      const valB = parseFloat(rowB.getValue("change"));
      // Subtract to get proper sorting for numbers
      return valA - valB;
    },
  },
  {
    accessorKey: "todaysChangePerc",
    sortDescFirst: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            // Toggle sorting, and handle the initial undefined state for sort direction
            column.toggleSorting(column.getIsSorted() ? undefined : true);
          }}
          className="text-right"
        >
          % Change
          {column.getIsSorted() === "asc" ? (
            <IoMdArrowDropdown size={20} />
          ) : column.getIsSorted() === "desc" ? (
            <IoMdArrowDropup size={20} />
          ) : (
            <div className="w-5"></div>
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const todaysChangePerc = parseFloat(row.getValue("todaysChangePerc"));
      return (
        <div
          className={`text-right font-medium ${todaysChangePerc >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {formatNumber(todaysChangePerc)}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const valA = parseFloat(rowA.getValue("todaysChangePerc"));
      const valB = parseFloat(rowB.getValue("todaysChangePerc"));
      // Subtract to get proper sorting for numbers
      return valA - valB;
    },
  },
  {
    accessorKey: "volume",
    sortDescFirst: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (column.getIsSorted() === undefined) {
              // If not sorted, sort in descending order first
              column.getSortingFn();
            } else {
              // Toggle sorting if already sorted
              column.toggleSorting();
            }
          }}
          className="text-right"
        >
          Volume
          {column.getIsSorted() === "asc" ? (
            <IoMdArrowDropdown size={20} />
          ) : column.getIsSorted() === "desc" ? (
            <IoMdArrowDropup size={20} />
          ) : (
            <div className="w-5"></div>
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const volume = parseFloat(row.getValue("volume"));
      return (
        <div className="text-right font-medium">{formatNumber(volume)}</div>
      );
    },
  },
  {
    accessorKey: "marketCap",
    sortDescFirst: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (column.getIsSorted() === undefined) {
              // If not sorted, sort in descending order first
              column.getSortingFn();
            } else {
              // Toggle sorting if already sorted
              column.toggleSorting();
            }
          }}
          className="text-right"
        >
          Market Cap
          {column.getIsSorted() === "asc" ? (
            <IoMdArrowDropdown size={20} />
          ) : column.getIsSorted() === "desc" ? (
            <IoMdArrowDropup size={20} />
          ) : (
            <div className="w-5"></div>
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const marketCap = parseFloat(row.getValue("marketCap"));
      return (
        <div className="text-right font-medium">
          {marketCap ? formatNumber(marketCap) : "NA"}
        </div>
      );
    },
  },
  {
    accessorKey: "sma50",
    sortDescFirst: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (column.getIsSorted() === undefined) {
              // If not sorted, sort in descending order first
              column.getSortingFn();
            } else {
              // Toggle sorting if already sorted
              column.toggleSorting();
            }
          }}
          className="text-right"
        >
          50-Day SMA
          {column.getIsSorted() === "asc" ? (
            <IoMdArrowDropdown size={20} />
          ) : column.getIsSorted() === "desc" ? (
            <IoMdArrowDropup size={20} />
          ) : (
            <div className="w-5"></div>
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const sma50 = parseFloat(row.getValue("sma50"));
      return <div className="text-right  font-medium">{sma50.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "sma200",
    sortDescFirst: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (column.getIsSorted() === undefined) {
              // If not sorted, sort in descending order first
              column.getSortingFn();
            } else {
              // Toggle sorting if already sorted
              column.toggleSorting();
            }
          }}
          className="text-right"
        >
          200-Day SMA
          {column.getIsSorted() === "asc" ? (
            <IoMdArrowDropdown size={20} />
          ) : column.getIsSorted() === "desc" ? (
            <IoMdArrowDropup size={20} />
          ) : (
            <div className="w-5"></div>
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const sma200 = parseFloat(row.getValue("sma200"));
      return <div className="text-right  font-medium">{sma200.toFixed(2)}</div>;
    },
  },
];
