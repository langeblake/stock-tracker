# [Lumière](https://lumiere-stocktracker.vercel.app/): U.S. Stock Tracker

Lumiere is a U.S. stock tracker that provides users with an overview of the markets, trending stock lists, and detailed pages for individual stocks. It leverages real-time data from the Polygon.io API to keep users informed about the latest market trends. With Lumiere, users can explore interactive charts, search for specific stocks, and create accounts for a personalized experience.

[Visit Lumière here!](https://lumiere-stocktracker.vercel.app/) 

## Features
- **Market Overview**: Get an overview of the U.S. stock markets at a glance.
- **Trending Stock List**: Explore trending stocks and search for individual stocks.
- **Individual Stock Pages**: Dive into detailed pages for each stock, including interactive charts built with Recharts.
- **User Authentication**: Create accounts using email, Google, or Github with user authentication powered by Next-Auth.

## Project Challenges
- **Handling API Endpoint Clears and Updates**: Managing the regular clearing and updating of API endpoints by Polygon.io for real-time data was challenging, especially to ensure consistency and reliability, but I'm happy with the solutions I found using custom internal APIs to handle the data. 
- **Data Visualization and Chart Building**: Creating interactive charts and visualizations for stock data required careful design and implementation to provide users with meaningful insights and accurate data representation. I used ReCharts to visualize data and build customized interactive area and cndlesstick charts.
- **Manipulating Data from the Polygon API for Custom Components**: Working with data from external APIs like Polygon.io required a solid understanding of its structure, but I was able to efficiently manipulate it to fit custom components and UI requirements. 


## Tech Stack
- **Next.js**
- **React**
- **TypeScript**
- **Recharts**
- **MongoDB**
- **Prisma**
- **Tailwind CSS**
