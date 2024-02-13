# KRX Quant Front-End
The front-end of this project uses NEXT.js, React, Typescript, Tailwind, and NPM (npm is the default package manager for the JavaScript runtime environment Node.js).
</br>
</br>

## Setting Up API Keys (dev branch)
Before running the project, you'll need to set up your API key for finance data. This project currently uses US stock data from Polygon.io. </br>Create a .env.local file in the project root directory and add your API key as follows:

```Bash
External:
NEXT_PUBLIC_POLYGON_API_KEY=api_key_here

Internal:
NEXT_PUBLIC_BABYQUANT_API_KEY=BABYQUANT2024

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


