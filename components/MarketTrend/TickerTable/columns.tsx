'use client'

import { ColumnDef } from "@tanstack/react-table";

export type TrendingTicker = {
    ticker: {
        ticker: string;
        todaysChangePerc: number;
        todaysChange: number;
        updated: number;
        day: {
          o: number;
          h: number;
          l: number;
          c: number;
          v: number;
          vw: number;
        };
        min: {
          av: number;
          t: number;
          n: number;
          o: number;
          h: number;
          l: number;
          c: number;
          v: number;
          vw: number;
        };
        prevDay: {
          o: number;
          h: number;
          l: number;
          c: number;
          v: number;
          vw: number;
        };
      };
      name: string;
      marketCap: number;
      sma200: number;
      sma50: number;
      status: string;
    };



export const columns: ColumnDef<TrendingTicker>[] = [
    {
        accessorKey: 'favorite',
        header: 'Favorite'
    },
    {
        accessorKey: 'ranking',
        header: 'Ranking'
    },
    {
        accessorKey: 'ticker.ticker',
        header: 'Symbol'
    },
    {
        accessorKey: 'ticker.day.c',
        header: 'Price'
    },
    {
        accessorKey: 'ticker.todaysChange',
        header: 'Change'
    },
    {
        accessorKey: 'ticker.todaysChangePerc',
        header: '% Change'
    },
    {
        accessorKey: 'ticker.day.v',
        header: 'Volume'
    },
    {
        accessorKey: 'marketCap',
        header: 'Market Cap'
    },
    {
        accessorKey: 'sma50',
        header: '50-Day SMA'
    },
    {
        accessorKey: 'sma200',
        header: '200-Day SMA'
    },
]