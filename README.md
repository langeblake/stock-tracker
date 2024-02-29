# KRX Quant Front-End
The front-end of this project uses NEXT.js, React, Typescript, Tailwind, and NPM (npm is the default package manager for the JavaScript runtime environment Node.js).
</br>
</br>

## Setting Up API Key & BaseURL (for development)
Before running the project, you'll need to set up your API key for finance data. This project currently uses US stock data from Polygon.io. </br>You will also need to add an Internal API Base URL while this project is in development.
</br>Create a .env.local file in the project root directory and add your API key as follows:

```Bash
POLYGON_API_KEY=api_key_here

// .env.local (for development)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```
</br>

## Ensure you have Node.js installed on your system

### Checking Node.js Version
```Bash
node -v
```

To install Node.js, visit the [Node.js website](https://www.example.com) and download the installer for your operating system.

### Install Dependencies
```Bash
npm install
```

### Run the Project Locally
```Bash
npm run dev
```


