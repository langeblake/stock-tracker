// 'use client'

// import { NextResponse } from "next/server";

// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/lib/prismadb";

// interface IParams {
//   ticker?: string;
// }

// export async function POST(
//   request: Request, 
//   { params }: { params: IParams }
// ) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const { ticker } = params;

//   if (!ticker || typeof ticker !== 'string') {
//     throw new Error('Invalid ID');
//   }

//   let favoriteIds = [...(currentUser.favoriteIds || [])];

//   favoriteIds.push(ticker);

//   const user = await prisma.user.update({
//     where: {
//       id: currentUser.id
//     },
//     data: {
//       favoriteIds
//     }
//   });

//   return NextResponse.json(user);
// }

// export async function DELETE(
//   request: Request, 
//   { params }: { params: IParams }
// ) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const { ticker } = params;

//   if (!ticker || typeof ticker !== 'string') {
//     throw new Error('Invalid ID');
//   }

//   let favoriteIds = [...(currentUser.favoriteIds || [])];

//   favoriteIds = favoriteIds.filter((id) => id !== ticker);

//   const user = await prisma.user.update({
//     where: {
//       id: currentUser.id
//     },
//     data: {
//       favoriteIds
//     }
//   });

//   return NextResponse.json(user);
// }