// 'use client'

// import { format, getMonth, isWithinInterval, parseISO, subDays } from 'date-fns';
// import React from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useTheme } from 'next-themes';


// export const MonthReAreaChart = ({ data }) => {
//     const { theme } = useTheme(); // 'light' or 'dark'

//     // Calculate the date 31 days ago from now
//     const days31Ago = subDays(new Date(), 31);

//     // Filters data to include only from the last 31 days
//     const dataForLast31Days = data.filter(d =>
//         isWithinInterval(parseISO(d.date), { start: days31Ago, end: new Date() })
//     );

//     const tickFormatter = (str) => format(parseISO(str), "MMM dd");


//     const CustomToolTip = ({ active, payload, label }) => {
//       if (active) {
//           return (
//               <div className='flex flex-col justify-content items-center gap-2 bg-zinc-900/70 text-white p-4 rounded-lg'>
//                   <h4 className='font-bold'>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
//                   <p>${payload[0].value.toFixed(2)}</p>
//               </div>
//           )
//       }
//     }

//     return (
//       <div className='pt-16 text-black'>
//         <ResponsiveContainer width="100%" height={400}>
//         <AreaChart
//           width={1200}
//           height={400}
//           data={dataForLast31Days}
//           margin={{
//             top: 10,
//             right: 30,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <defs>
//             <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="50%" stopColor='#2451B7' stopOpacity={0.9}/>
//                 <stop offset="95%" stopColor='#2451B7' stopOpacity={0.1}/>
//             </linearGradient>
//           </defs>
//           <XAxis 
//             dataKey="date" 
//             axisLine={false}
//             tickLine={false}
//             tickFormatter={tickFormatter}
//           />
//           <YAxis 
//             orientation="right" 
//             dataKey="close" 
//             axisLine={false} 
//             tickLine={false} 
//             tickCount={4} 
//             tickFormatter={(number) => `$${number.toFixed(2)}`}
//           />
//           <Tooltip content={<CustomToolTip active={undefined} payload={undefined} label={undefined} />}/>
//           <Area type="monotone" dataKey="close" stroke="#2451B7" fill="url(#color)" />
//           <CartesianGrid opacity={0.1} vertical={false} stroke={theme === 'dark' ? "white" : "black"}/>
//         </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   };

