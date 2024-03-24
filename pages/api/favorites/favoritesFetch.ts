import prisma from "@/lib/prismadb";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const userId = req.query.userId;
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { favorites: true },
      });

      res.status(200).json(user?.favorites.map(fav => fav.ticker));
    } catch (error) {
      res.status(500).json({ error: 'Error fetching favorites' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
