'use client'

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { IoIosStarOutline, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

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
        return `${value}`;
    }
    }

export const columns: ColumnDef<TrendingTicker>[] = [
    {
        accessorKey: 'favorite',
        header: ' ',
        cell: () => <div className="flex justify-center hover:scale-125 w-12 " ><IoIosStarOutline /></div>
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
        accessorKey: 'symbol',
        header: 'Symbol',
        cell: ({ row }) => {
            const symbol = row.getValue("symbol");
            return <div className="font-bold text-left">{symbol !== undefined ? symbol?.toString() : 'N/A'}</div>;
            }
    },
    {
        accessorKey: 'price',
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
                    {column.getIsSorted() === 'asc' ? (
                        <IoMdArrowDropdown size={20}/>
                    ) : column.getIsSorted() === 'desc' ? (
                        <IoMdArrowDropup size={20}/>
                    ) : <div className="w-5"></div>}
                </Button>
            )
        },
        cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    
        return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: 'change',
        sortDescFirst: true,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        // Use the same corrected approach as 'price'
                        if (column.getIsSorted() === undefined) {
                            column.getAutoSortDir();
                        } else {
                            column.toggleSorting();
                        }
                    }}
                    className="text-right"
                >
                    Change
                    {column.getIsSorted() === 'asc' ? (
                        <IoMdArrowDropdown size={20}/>
                    ) : column.getIsSorted() === 'desc' ? (
                        <IoMdArrowDropup size={20}/>
                    ) : <div className="w-5"></div>}
                </Button>
            )
        },
        cell: ({ row }) => {
        const change = parseFloat(row.getValue("change"))
        const formatted = new Intl.NumberFormat("en-US").format(change)
        return <div className={`text-right font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{formatted}</div>
        },
    },
    {
        accessorKey: 'todaysChangePerc',
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
                    % Change
                    {column.getIsSorted() === 'asc' ? (
                        <IoMdArrowDropdown size={20}/>
                    ) : column.getIsSorted() === 'desc' ? (
                        <IoMdArrowDropup size={20}/>
                    ) : <div className="w-5"></div>}
                </Button>
            )
        },
        cell: ({ row }) => {
        const todaysChangePerc = parseFloat(row.getValue("todaysChangePerc"))
        return <div className="text-right font-medium">{formatNumber(todaysChangePerc)}</div>
        },
    },
    {
        accessorKey: 'volume',
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
                    {column.getIsSorted() === 'asc' ? (
                        <IoMdArrowDropdown size={20}/>
                    ) : column.getIsSorted() === 'desc' ? (
                        <IoMdArrowDropup size={20}/>
                    ) : <div className="w-5"></div>}
                </Button>
            )
        },
        cell: ({ row }) => {
        const volume = parseFloat(row.getValue("volume"))
        return <div className="text-right font-medium">{formatNumber(volume)}</div>
        },
    },
    {
        accessorKey: 'marketCap',
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
                    {column.getIsSorted() === 'asc' ? (
                        <IoMdArrowDropdown size={20}/>
                    ) : column.getIsSorted() === 'desc' ? (
                        <IoMdArrowDropup size={20}/>
                    ) : <div className="w-5"></div>}
                </Button>
            )
        },
        cell: ({ row }) => {
        const marketCap = parseFloat(row.getValue("marketCap"))
        return <div className="text-right  font-medium">{formatNumber(marketCap)}</div>
        },
    },
    {
        accessorKey: 'sma50',
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
                    {column.getIsSorted() === 'asc' ? (
                        <IoMdArrowDropdown size={20}/>
                    ) : column.getIsSorted() === 'desc' ? (
                        <IoMdArrowDropup size={20}/>
                    ) : <div className="w-5"></div>}
                </Button>
            )
        },
        cell: ({ row }) => {
        const sma50 = parseFloat(row.getValue("sma50"))
        return <div className="text-right  font-medium">{formatNumber(sma50)}</div>
        },
    },
    {
        accessorKey: 'sma200',
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
                    {column.getIsSorted() === 'asc' ? (
                        <IoMdArrowDropdown size={20}/>
                    ) : column.getIsSorted() === 'desc' ? (
                        <IoMdArrowDropup size={20}/>
                    ) : <div className="w-5"></div>}
                </Button>
            )
        },
        cell: ({ row }) => {
        const sma200 = parseFloat(row.getValue("sma200"))
        return <div className="text-right  font-medium">{formatNumber(sma200)}</div>
        },
    },
]