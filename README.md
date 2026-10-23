# Movie Browser

A movie browsing web application built with React 19 and Vite. It uses The Movie Database (TMDB) API to search for movies and display movie information, with Appwrite powering the Trending Now feature by tracking popular search terms.

## Features

- Search for movies using the TMDB API
- Browse popular movies
- Display movie posters, ratings, languages, and release years
- Show a Trending Now section based on search activity
- Track search counts using Appwrite TablesDB
- Responsive interface styled with Tailwind CSS

## Technologies Used

- React 19
- Vite
- JavaScript
- Tailwind CSS
- TMDB API
- Appwrite TablesDB

## Learning Resource and Acknowledgment

This project was developed with the help of the YouTube tutorial by JavaScript Mastery:

**[React JS 19 Full Course 2025 | Build an App and Master React in 2 Hours](https://www.youtube.com/watch?v=dCLhUialKPQ)**

I followed the tutorial for the initial setup and development of the movie browser, including the React components, styling, movie search functionality, and search optimization, up to the Appwrite integration.

When I reached the Appwrite implementation for the Trending Now feature, the Appwrite interface and workflow no longer matched the steps shown in the tutorial. Because I could not follow the original instructions as written, I independently explored the updated Appwrite setup and adapted the implementation to work with the current TablesDB API.

This involved figuring out how to configure the database and table, connect Appwrite to the React application, store search data, update search counts, and retrieve the most-searched movies for the Trending Now section.

The resulting project combines the tutorial's guidance with my own implementation and troubleshooting of the Appwrite integration.

Credit and thanks to **JavaScript Mastery** for the educational resource.

## Getting Started

### Prerequisites

- Node.js and npm
- A TMDB account and API read access token
- An Appwrite project with a configured database and table

### Installation

1. Clone this repository.
2. Open a terminal in the project directory.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and add your TMDB token:

   ```dotenv
   VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token_here
   ```

5. Configure your Appwrite endpoint, project ID, database ID, table ID, columns, and permissions in accordance with the application setup.
6. Start the development server:

   ```bash
   npm run dev
   ```

### Production Build

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## Environment Variables and Security

Do not commit your actual `.env` file or credentials to the repository. Use `.env.example` as a template.

The TMDB token is used by the frontend in this learning project. Because Vite exposes `VITE_`-prefixed variables to client-side code, this setup should not be treated as a way to keep the token secret.

Appwrite permissions should also be configured carefully. For a production deployment, database write operations should be handled by a trusted backend or server-side function rather than being openly available to every website visitor.

## Data and API Attribution

Movie information is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This project is an educational project and is not endorsed by or affiliated with JavaScript Mastery, Appwrite, or TMDB.
