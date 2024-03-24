import prisma from "@/lib/prismadb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, favorites } = req.body;
    try {
      // Remove all existing favorites for the user
      await prisma.favorite.deleteMany({
        where: { userId },
      });

      // Add new favorites for the user
      await prisma.favorite.createMany({
        data: favorites.map((ticker: string) => ({
          userId,
          ticker,
        })),
      });

      res.status(200).json({ message: 'Favorites updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating favorites' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
