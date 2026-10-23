
import { useEffect, useState } from 'react';
import { ID, Query } from 'appwrite';
import Search from './components/search';
import Spinner from './components/spinner';
import MovieCard from './components/Moviecard';
import { useDebounce } from 'react-use';
import { tablesDB } from './lib/appwrite';
import TrendingMovies from './components/TrendingMovies';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

const DATABASE_ID = '6ad8e3bb00063c38aae4';
const TABLE_ID = '6ad8e4b8001be7721544';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchTrendingMovies = async () => {
    try {
      const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        queries: [
          Query.orderDesc('count'),
          Query.limit(5)
        ]
      });
      console.log("Trending rows from Appwrite:", response.rows);

      setTrendingMovies(response.rows);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };
  
  const updateSearchCount = async (query, movie) => {
      try {
        const response = await tablesDB.listRows({
          databaseId: DATABASE_ID,
          tableId: TABLE_ID,
          queries: [
            Query.equal("searchTerm", query),
            Query.limit(1),
          ],
        });

        const movieData = {
          movie_id: movie.id,
          poster_url: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "",
          title: movie.title,
          vote_average: movie.vote_average ?? 0,
          release_date: movie.release_date ?? "",
          original_language: movie.original_language ?? "",
        };

        if (response.rows.length > 0) {
          const existingRow = response.rows[0];

          await tablesDB.updateRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: existingRow.$id,
            data: {
              ...movieData,
              count: existingRow.count + 1,
            },
          });
        } else {
          await tablesDB.createRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: ID.unique(),
            data: {
              searchTerm: query,
              count: 1,
              ...movieData,
            },
          });
        }

        await fetchTrendingMovies();
      } catch (error) {
        console.error("Error updating search count:", error);
      }
    };
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      const results = data.results || [];

      setMovieList(results);

      if (query.trim() && results.length > 0) {
        await updateSearchCount(query.trim(), results[0]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Background" />
          <h1>
            Find <span className="text-gradient">Movies</span> and Enjoy!
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </header>

        <TrendingMovies movies={trendingMovies} />

        <section className="all-movies">
          <h2 className="mt-[40px] text-3xl font-extrabold tracking-tight sm:text-4xl">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
